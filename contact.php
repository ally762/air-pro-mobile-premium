<?php
/**
 * AirPro Mobile — contact / booking form handler
 * Receives POST from the site forms and emails the request.
 * Responds with JSON: { ok: bool, message: string }
 */
declare(strict_types=1);

header('Content-Type: application/json; charset=utf-8');
header('X-Content-Type-Options: nosniff');

// ---- Settings ---------------------------------------------------------
const TO_EMAIL   = 'info@airpro-mobile.com';
const FROM_EMAIL = 'no-reply@airpro-mobile.com';   // must be a domain mailbox for good deliverability
const SITE_NAME  = 'AirPro Mobile Website';
// -----------------------------------------------------------------------

function respond(bool $ok, string $message, int $code = 200): void {
    http_response_code($code);
    echo json_encode(['ok' => $ok, 'message' => $message]);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    respond(false, 'Method not allowed.', 405);
}

// Honeypot: bots fill hidden "website" field
if (!empty($_POST['website'])) {
    respond(true, 'Thank you! We’ll be in touch shortly.');
}

// Simple rate limit: 1 submission per 30s per session
session_start();
if (isset($_SESSION['last_submit']) && time() - $_SESSION['last_submit'] < 30) {
    respond(false, 'Please wait a moment before sending another request.', 429);
}

function clean(string $key, int $max = 500): string {
    $v = isset($_POST[$key]) ? trim((string)$_POST[$key]) : '';
    $v = str_replace(["\r", "\n", "%0a", "%0d"], ' ', $v);   // header-injection guard for single-line fields
    return mb_substr(strip_tags($v), 0, $max);
}

$name    = clean('name', 120);
$email   = filter_var(trim((string)($_POST['email'] ?? '')), FILTER_VALIDATE_EMAIL) ?: '';
$phone   = preg_replace('/[^0-9+\-\s().]/', '', clean('phone', 40));
$service = clean('service', 80) ?: 'General';
$message = mb_substr(strip_tags(trim((string)($_POST['message'] ?? ''))), 0, 4000);

if ($name === '' || $email === '' || $phone === '' || $message === '') {
    respond(false, 'Please fill in all fields with valid details.', 422);
}

$subject = sprintf('[%s] New %s request from %s', SITE_NAME, $service, $name);
$body  = "New service request from the website\n";
$body .= "-------------------------------------\n";
$body .= "Name:    {$name}\n";
$body .= "Email:   {$email}\n";
$body .= "Phone:   {$phone}\n";
$body .= "Service: {$service}\n\n";
$body .= "Message:\n{$message}\n\n";
$body .= "-------------------------------------\n";
$body .= 'Sent: ' . date('Y-m-d H:i:s T') . "\n";
$body .= 'IP:   ' . ($_SERVER['REMOTE_ADDR'] ?? 'unknown') . "\n";

$headers  = 'From: ' . SITE_NAME . ' <' . FROM_EMAIL . ">\r\n";
$headers .= 'Reply-To: ' . $name . ' <' . $email . ">\r\n";
$headers .= "MIME-Version: 1.0\r\n";
$headers .= "Content-Type: text/plain; charset=UTF-8\r\n";

$sent = @mail(TO_EMAIL, '=?UTF-8?B?' . base64_encode($subject) . '?=', $body, $headers);

if ($sent) {
    $_SESSION['last_submit'] = time();
    respond(true, 'Thank you! Your request is in — our team will contact you shortly.');
}

respond(false, 'Message could not be sent. Please call 561-203-3813.', 500);

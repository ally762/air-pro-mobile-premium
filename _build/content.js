/* =========================================================
   AirPro Mobile — site content (taken from airpro-mobile.com)
   Edit text here, then run:  node _build/build.js
   ========================================================= */

const PHONE = '561-203-3813';
const TEL = 'tel:5612033813';
const EMAIL = 'info@airpro-mobile.com';

/* ---------- Services (menu + cards) ---------- */
const services = [
  { slug: 'engine-repair', name: 'Powerplant Services', icon: 'engine', img: 'engine-open.jpg',
    tagline: 'Reliable Engine Repair for Safe, Dependable Flight.' },
  { slug: 'aog-maintenance', name: 'AOG Maintenance', icon: 'aog', img: 'jet-ramp.jpg',
    tagline: 'Fast AOG Support to Get Your Aircraft Flying Again.' },
  { slug: 'avionics-service', name: 'Avionics Service', icon: 'avionics', img: 'avionics-panel.jpg',
    tagline: 'Expert Avionics Service for Reliable Aircraft Systems.' },
  { slug: 'oxygen-servicing', name: 'Oxygen Servicing', icon: 'oxygen', img: 'oxygen-cart.jpg',
    tagline: 'Professional Oxygen Servicing for Safe, Compliant Flight.' },
  { slug: 'trouble-shooting', name: 'Troubleshooting', icon: 'trouble', img: 'engine-bay.jpg',
    tagline: 'That is why fast, accurate troubleshooting matters.' },
  { slug: 'pre-post-flights', name: 'Pre/Post Flights', icon: 'flight', img: 'jet-stairs.jpg',
    tagline: 'Aircraft readiness does not start at takeoff, and it does not end at landing.' }
];

/* ---------- Testimonials (home) ---------- */
const reviews = [
  ['will Dugan', 'Had mark and his team come out and help me when my plane broke down. His team of experts came with calibrated tools, up to date manuals, and an incredible work effort. Ended up having me back in the air in no time. Would 100% recommend to anyone needing AOG maintenance or even preventative. I have them doing my annual this June on a Grumman AA1B'],
  ['brendon west', 'Solid experience with Airpro Mobile, Communication was clear, the aircraft was in excellent condition, and the crew was professional and easy to work with. Everything ran smoothly and on time, which I really appreciated. You can tell this is a company that takes safety and operations seriously. Would definitely recommend and fly with them again'],
  ['Dan Stueber', 'Great last minute service'],
  ['Kristopher Mercedes', 'Took a trip to Naples and when I came back from a nice meal , aircraft didn’t turn on and it was already 7pm and no staff onsite to help , battery ended up being dead , found Mark online and he was more than helpful, walked me thru a whole process to diagnose the problem and figured it out. Mark came out in the middle of the night helped fix the problem, Me and the passengers were on our way back to our next destination. Can’t thank mark enough for the tremendous help, we would have been stuck there till the next day.'],
  ['Emir Yildiz', 'Mark is great. He is very communicative, very quick to dispatch to plane for repairs and does an excellent job. He fixed few issues in my C172 in the evening hours and got my plane up and running and fixed few other things that I asked. I have switched my A&P over to his services and very happy about it. The benefit is because he’s mobile, he will come to you if you happen to get stranded somewhere as well. Highly recommend him!'],
  ['Sandro Flores', 'Reliable, honest, efficient and economical. What else can I say about Mark and his team. I was extremely impressed and his work & service exceeded all of my expectations. Thank you.'],
  ['Brandon', 'Mark and his team are the best mobile mechanics, they will come to you anywhere anytime. When they are with your aircraft you are the number one priority. Most mechanics struggle juggling several aircraft at once but not these guys. They came prepared with the proper calibrated tooling, maintenance manuals and got right to work. Combed through found discrepancies and created a professional list of the must repair items and items to keep an eye on for the future or to track over time. No job is too big or too small. They have done our eight seat twin engine, four seat single engine, and I will have them do two more of my Aircraft soon. Mark is a pleasure to interact with a man of his word and very knowledgeable and fair.'],
  ['Colin Foreman', 'Great guys! Great Service! Veteran owned and operated small business. Give these guys a shot.']
];

/* ---------- Home FAQ ---------- */
const homeFaq = [
  ['What does a mobile aircraft mechanic do?', 'A mobile aircraft mechanic provides on-site maintenance, inspections, and repairs without requiring the aircraft to be moved to a repair facility.'],
  ['How do I find an aircraft mechanic near me?', 'You should look for certified providers offering mobile services, as they can respond quickly and perform work at your location.'],
  ['Do you provide turbine engine services?', 'Yes, AirPro Mobile supports turbine inspections, troubleshooting, and maintenance.'],
  ['Do you operate across Florida?', 'Yes, services are available statewide, covering a wide range of locations and aircraft needs.'],
  ['Do you offer emergency AOG support?', 'Yes, 24/7 emergency AOG support is available for urgent aircraft maintenance situations.']
];

/* ---------- Aircraft we service (client request — replaces hourly rates) ---------- */
const aircraft = [
  { name: 'Single Engine', icon: 'single', note: 'Piston singles and personal aircraft — e.g. Cessna 172, Grumman AA-1B.' },
  { name: 'Light Twins', icon: 'twin', note: 'Light twin-engine piston aircraft.' },
  { name: 'Heavy Twins', icon: 'twin', note: 'Larger twin-engine aircraft, including eight-seat twins.' },
  { name: 'Turboprops', icon: 'turboprop', note: 'Turboprop aircraft and turbine engine support.' },
  { name: 'Helicopters', icon: 'heli', note: 'Rotorcraft maintenance and avionics support.' },
  { name: 'Jets / Turbine', icon: 'jet', note: 'From light jets to Business Class Jets.' }
];

/* ---------- Full list of services we offer ---------- */
const serviceList = [
  { slug: 'engine-repair', items: ['Turbine engine diagnostics', 'Engine troubleshooting & corrective repair', 'Turbofan, turboprop & turbojet support', 'Preventive maintenance planning'] },
  { slug: 'aog-maintenance', items: ['24/7 emergency diagnostics', 'On-site repairs', 'Component replacement', 'Return-to-service support'] },
  { slug: 'avionics-service', items: ['Inspection & diagnostics', 'Avionics repair & maintenance', 'GPS, navigation & communication installs', 'Glass cockpit upgrades & ADS-B compliance'] },
  { slug: 'oxygen-servicing', items: ['Oxygen cylinder inspection', 'Refilling & pressure testing', 'Leak detection & system checks', 'Routine maintenance programs'] },
  { slug: 'trouble-shooting', items: ['Systems & component diagnostics', 'Avionics & software integration', 'Data bus & connectivity resolution', 'Reliability & return to service'] },
  { slug: 'pre-post-flights', items: ['Pre-flight inspections', 'Post-flight inspections', 'Fuel & fluid checks', 'Documentation & detailed reporting'] }
];

/* ---------- Hangar (client request) ---------- */
const HANGAR = { code: 'KVRB', name: 'Vero Beach Regional Airport', city: 'Vero Beach, FL',
  map: 'https://www.google.com/maps/search/?api=1&query=Vero+Beach+Regional+Airport+KVRB' };

/* ---------- Individual service pages ---------- */
const servicePages = {
  'engine-repair': {
    title: 'Aircraft Engine Repair Florida | Turbine Engine Repair Experts',
    desc: 'AirPro Mobile provides aircraft engine repair in Florida, including turbine engine repair and aviation engine services. Mobile experts deliver reliable aircraft support.',
    h1: 'Powerplant Services', hero: 'engine-open.jpg',
    intro: { eyebrow: 'About AirPro Mobile LLC', title: 'Turbine Engine Repair Services across Florida',
      lead: 'Aircraft engine issues rarely stay small for long. Delays, performance concerns, and unscheduled downtime affect operations quickly. AirPro Mobile LLC provides reliable aircraft engine repair in Florida, helping owners and operators resolve engine problems with professional diagnostics and efficient repair solutions.',
      after: 'AirPro Mobile LLC provides dependable support for Turbine Engine Repair across Florida, with a focus on safety, accuracy, and fast response for private and commercial operators. Contact us to book your appointment.',
      img: 'engine-open.jpg', img2: 'turbine-core.jpg' },
    blocks: [
      { t: 'text', eyebrow: 'AirPro Mobile LLC', title: 'Comprehensive Aircraft Engine Repair Solutions', img: 'turbine-core.jpg', paras: [
        'Engine problems can come from wear, heat stress, component failure, fuel system issues, or performance irregularities that develop over time. The right repair approach starts with finding the actual source of the problem instead of guessing based on symptoms alone.',
        'Our aircraft engine repair services are built to address both urgent problems and ongoing maintenance needs. That includes turbine engine diagnostics, troubleshooting, and corrective work that helps restore reliability and performance. We also support preventive maintenance planning for operators who want to reduce avoidable downtime and catch problems before they become more expensive to resolve.',
        'When an aircraft is grounded unexpectedly, response time becomes critical. Our emergency and AOG support services are designed to move quickly, assess the engine issue on-site when possible, and help operators make informed decisions without wasting valuable time.',
        'For owners and operators looking for practical, experienced support, our turbine engine repair services near you are focused on clear diagnostics, compliant repair procedures, and dependable turnaround.'] },
      { t: 'text', dark: true, title: 'Specialized Aviation Turbine Engine Repair', img: 'engine-bay.jpg', paras: [
        'Not every engine issue requires the same level of intervention, and not every repair provider is equipped to handle turbine systems with the precision they require. That is why our aviation turbine engine repair service is structured around engine-specific knowledge, accurate inspection, and disciplined repair standards.',
        'We support turbofan, turboprop, and turbojet engines with repair solutions that are based on the actual condition of the engine and its components. This includes detailed inspection, targeted replacement of worn or damaged parts, and repair planning that aligns with aviation safety requirements.',
        'Our technicians work with advanced diagnostic tools and proven repair methods to evaluate performance concerns, identify fault areas, and determine the most appropriate next step. Whether the issue involves a component-level defect, system imbalance, or recurring engine concern, the process stays focused on safe and efficient resolution.',
        'FAA-compliant procedures remain central throughout the repair stage. That matters because speed without proper standards creates more risk, not less. Operators need a service that restores engine performance while protecting compliance and long-term reliability.'] },
      { t: 'split', left: { title: 'Why Choose AirPro Mobile?', paras: ['Aircraft maintenance decisions often come down to trust. Operators need to know the team handling the engine understands both the technical side and the urgency behind the work.', 'AirPro Mobile LLC is chosen for turbine and engine-related support because we provide:'],
          list: ['Experienced aviation technicians with hands-on repair knowledge', 'Fast turnaround focused on minimizing downtime', 'Service coverage across Florida', 'Strict attention to safety and compliance requirements', 'Cost-conscious repair solutions based on actual needs, not inflated scope'],
          after: ['We work with operators who need practical answers, clear communication, and service that is built around getting aircraft back to operation safely.'] },
        right: { title: 'Industries We Serve', paras: ['Engine reliability matters across every part of aviation, but different operators face different pressures. Our repair services support a range of aviation clients, including:'],
          list: ['Commercial airlines', 'Private jet owners and operators', 'Cargo aviation companies', 'MRO providers'],
          after: ['Each operation has its own scheduling, maintenance, and performance priorities. We provide repair support that aligns with those demands while keeping safety and compliance at the center.'] } },
      { t: 'steps', eyebrow: 'airpro mobile', title: 'Our Repair Process', intro: 'A strong repair process reduces delays and improves decision-making. Our approach follows a clear structure:', items: [
        ['Inspection & Diagnostics', 'The process starts with a focused inspection to identify the engine issue and evaluate the condition of affected systems or components.'],
        ['Detailed Repair Plan', 'Once the issue is confirmed, we outline the repair scope, required actions, and service path needed to address the problem properly.'],
        ['Engine Repair & Testing', 'Repair work is completed using approved methods, with attention to performance, system integrity, and proper component handling.'],
        ['Final Quality Assurance', 'Before returning to service, the engine and related work are reviewed to confirm the repair meets required standards.']] }
    ],
    faq: [
      ['How long does turbine engine repair take?', 'Repair time depends on the condition of the engine, the scope of the issue, and whether parts or additional inspection steps are required. After diagnostics, we provide a clearer repair path and expected turnaround.'],
      ['Do you offer nationwide aircraft engine repair?', 'Yes. AirPro Mobile provides repair support across the United States, including mobile response where applicable.'],
      ['Are your repairs FAA compliant?', 'Yes. All repair procedures are carried out with strict attention to applicable aviation safety and compliance standards.']],
    cta: { title: 'Get Expert Engine Support', paras: ['Engine issues affect schedules, costs, and operational confidence. The right repair team helps reduce that disruption with accurate diagnostics and disciplined service.', 'Get your aircraft back in the air faster. Contact AirPro Mobile LLC today for expert turbine engine repair in South Florida.'] }
  },

  'aog-maintenance': {
    title: 'AOG Aircraft Maintenance Florida | Aircraft Maintenance Services',
    desc: 'AirPro Mobile provides aircraft maintenance and AOG services in Florida. Our mobile technicians deliver fast, reliable aircraft support to minimize downtime.',
    h1: 'AOG Maintenance', hero: 'jet-ramp.jpg',
    intro: { eyebrow: 'AirPro Mobile LLC', title: 'AOG Aircraft Maintenance Services | 24/7 Aircraft Maintenance Support',
      lead: 'Aircraft downtime is never planned, but it always demands immediate action. That’s where Aircraft Maintenance and AOG Maintenance become critical.',
      after: 'AirPro Mobile LLC provides rapid-response AOG aircraft maintenance services in Florida that minimize delays and help get your aircraft back in service quickly. When time matters, fast and reliable support makes all the difference. Contact us to learn more about our AOG maintenance services.',
      img: 'jet-ramp.jpg', img2: 'tail-work.jpg' },
    blocks: [
      { t: 'text', title: 'What is AOG Aircraft Maintenance?', img: 'hangar-walk.jpg', paras: [
        'AOG stands for “Aircraft on Ground,” a situation where an aircraft is unable to operate due to a technical issue. This could involve engine problems, avionics faults, or unexpected system failures.',
        'AOG aircraft maintenance focuses on resolving these issues as quickly as possible. We keep it simple at AirPro Mobile LLC. We identify the problem, fix it efficiently, and return the aircraft to service without unnecessary delays. In aviation, every hour on the ground impacts schedules, operations, and costs. Immediate maintenance support is essential to keep operations moving.'] },
      { t: 'text', dark: true, eyebrow: 'AirPro Mobile', title: '24/7 AOG Maintenance Services', img: 'tail-work.jpg', paras: [
        'AirPro Mobile LLC offers AOG Maintenance Services around the clock. Whether it’s early morning, late night, or a weekend call, the team is ready to respond.',
        'We focus on rapid deployment and on-site solutions. Instead of waiting for aircraft repositioning or shop availability, certified mechanics come directly to your hangar or location.',
        'Our AOG services include:'],
        list: ['Emergency diagnostics to quickly identify issues', 'On-site repairs to reduce downtime', 'Component replacement when required', 'Return-to-service support to ensure operational readiness'],
        after: ['Our job is to help reduce delays and keep your aircraft moving as planned.'] },
      { t: 'split', left: { title: 'Expert Aircraft Maintenance Solutions', paras: [
          'Beyond providing emergency aircraft on ground service, AirPro Mobile LLC delivers complete aircraft maintenance solutions. Our services cover a wide range of aircraft, from single-engine planes to business-class jets.',
          'Maintenance includes both preventive and corrective work. Preventive maintenance helps identify issues early, while corrective services address problems when they arise.',
          'From engine troubleshooting to avionics support, every task is handled with attention to detail and adherence to aviation standards. We help you maintain performance, safety, and reliability across every service provided.'] },
        right: { title: 'Why Choose AirPro Mobile for AOG Maintenance', paras: ['AirPro Mobile LLC is built around responsiveness and precision. Every service meets the demands of real-world aviation operations.', 'With us, you get:'],
          list: ['Fast response time when AOG situations occur', 'Certified aircraft mechanics with hands-on experience', 'Mobile on-site service delivered directly to your location', 'Coverage across Florida for flexible support', 'Strong focus on safety, compliance, and operational standards'],
          after: ['As a veteran-owned, Florida-based business, AirPro Mobile LLC is committed to delivering dependable service with a clear focus on quality and accountability.'] } },
      { t: 'steps', eyebrow: 'airpro mobile', title: 'Our AOG Maintenance Process', intro: 'AOG situations require a clear and efficient process. AirPro Mobile LLC follows a structured approach to ensure quick turnaround.', items: [
        ['Request Received', 'Service begins with a call or booking request. Details are reviewed immediately.'],
        ['Rapid Dispatch', 'A qualified technician is dispatched to your location without delay.'],
        ['On-Site Inspection', 'The issue is assessed directly at the aircraft to determine the cause.'],
        ['Immediate Repair or Action', 'Necessary repairs or replacements are carried out on-site whenever possible.'],
        ['Return to Service', 'Final checks are completed to ensure the aircraft is ready for operation.']] }
    ],
    faq: [
      ['What does AOG mean in aircraft maintenance?', 'AOG stands for Aircraft on Ground. It refers to a situation where an aircraft cannot operate due to a mechanical or technical issue.'],
      ['How fast can AOG maintenance be provided?', 'Response time is typically immediate or as fast as possible, depending on location and availability.'],
      ['What services are included in AOG maintenance?', 'Services include diagnostics, repairs, component replacement, and inspections required to return the aircraft to service.'],
      ['Do you offer 24/7 AOG maintenance services?', 'Yes, AirPro Mobile provides round-the-clock AOG support, including after-hours and weekend service.'],
      ['Can AOG maintenance be done on-site?', 'Yes, AirPro Mobile specializes in mobile aircraft maintenance, delivering on-site service directly to your location.']],
    cta: { title: 'Book AOG Maintenance Service', paras: ['When your aircraft is grounded, time is critical. AirPro Mobile LLC provides fast and reliable AOG Maintenance Services to get you back in the air.', 'Book your service directly here. For urgent situations, you can also contact the team directly for immediate assistance. Whether it’s scheduled support or an unexpected issue, help is available when you need it.'] }
  },

  'oxygen-servicing': {
    title: 'Aircraft Oxygen Servicing in Stuart Florida | AirPro Mobile',
    desc: 'Aircraft oxygen servicing in Florida by AirPro Mobile. Our mobile technicians provide safe oxygen system checks, servicing, and reliable aviation support.',
    h1: 'Oxygen Servicing', hero: 'oxygen-cart.jpg',
    intro: { eyebrow: 'About AirPro Mobile LLC', title: 'Aircraft Oxygen Servicing in Florida',
      lead: 'Aircraft oxygen systems require careful handling, accurate servicing, and strict attention to safety.',
      after: 'AirPro Mobile LLC provides dependable aircraft oxygen servicing in Stuart, Florida, for operators who need reliable services that align with U.S. aviation standards. Our team focuses on safe procedures, proper system checks, and responsive service that helps keep aircraft ready for operation.',
      img: 'oxygen-cart.jpg', img2: 'jet-stairs.jpg' },
    blocks: [
      { t: 'cards', eyebrow: 'AirPro Mobile LLC', title: 'Aircraft Oxygen Servicing Solutions', intro: 'Our oxygen servicing support is built around system reliability, safety, and proper maintenance', items: [
        ['Oxygen Cylinder Inspection', 'We inspect oxygen cylinders for condition, serviceability, and overall readiness. This helps identify issues before they affect performance or compliance.'],
        ['Oxygen Refilling & Pressure Testing', 'Our team handles oxygen refilling and pressure testing with attention to accuracy and safe operating standards. Proper pressure levels are essential for dependable system function.'],
        ['Leak Detection & System Checks', 'Leaks and system faults can create serious safety concerns. We perform detailed checks to identify pressure loss, connection issues, and other service-related problems.'],
        ['Emergency Oxygen System Service', 'When urgent oxygen system issues arise, fast response matters. We provide service support to address emergency needs and reduce downtime.'],
        ['Routine Maintenance Programs', 'Routine oxygen servicing helps prevent avoidable issues and keeps the system in proper condition over time.']] },
      { t: 'split', left: { title: 'Why Choose AirPro Mobile?', paras: ['AirPro Mobile LLC provides practical, safety-focused service backed by experience and responsiveness.'],
          list: ['Certified technicians', 'FAA-compliant procedures', 'Quick turnaround', 'Nationwide service', 'Advanced equipment'] },
        right: { title: 'Industries We Serve', paras: ['Our oxygen servicing supports a wide range of aviation operations, including:'],
          list: ['Private aircraft owners', 'Commercial aviation', 'Charter services', 'MRO providers'] } },
      { t: 'split', dark: true, left: { title: 'Service Areas in Florida', paras: ['AirPro Mobile LLC provides aircraft oxygen servicing across Florida, including major aviation hubs and regional locations. Our mobile service model helps operators access support quickly without unnecessary delays.'] },
        right: { title: 'Safety & Compliance', paras: ['Every oxygen service is handled with close attention to aviation safety requirements and quality standards. Proper procedures, accurate checks, and compliant servicing help protect both aircraft performance and operational readiness.'] } }
    ],
    faq: [
      ['What is aircraft oxygen servicing?', 'Aircraft oxygen servicing involves inspecting, refilling, pressure testing, and checking oxygen systems to ensure they operate safely and meet aviation standards. Regular servicing helps keep the system reliable and ready for flight.'],
      ['How often should aircraft oxygen systems be serviced?', 'The service interval depends on aircraft usage, oxygen levels, and manufacturer recommendations. Routine inspections and maintenance help identify issues early and keep the oxygen system operating safely.'],
      ['Do you provide aircraft oxygen servicing in Stuart, FL?', 'Yes. AirPro Mobile provides aircraft oxygen servicing in Stuart, FL, along with mobile support throughout Florida. Our technicians perform oxygen refilling, system inspections, leak detection, and pressure testing at your location.'],
      ['What is included in your aircraft oxygen servicing?', 'Our aircraft oxygen servicing includes oxygen cylinder inspections, oxygen refilling, pressure testing, leak detection, system checks, and routine maintenance. Every service is completed with a focus on safety, reliability, and FAA-compliant procedures.'],
      ['Why is routine aircraft oxygen servicing important?', 'Routine aircraft oxygen servicing helps maintain proper oxygen system performance, improves operational safety, and reduces the risk of unexpected issues. Regular maintenance also helps keep your aircraft ready for flight and supports compliance with aviation standards.']],
    cta: { title: 'Start Today – Contact Us!', paras: ['If your aircraft requires oxygen servicing, AirPro Mobile LLC is ready to help. Contact us today to request a quote or schedule professional support anywhere in Florida.'] }
  },

  'trouble-shooting': {
    title: 'Aircraft Troubleshooting Florida | AirPro Mobile',
    desc: 'AirPro Mobile offers aircraft troubleshooting services in Florida. Our mobile technicians provide diagnostics, inspections, and reliable aircraft system support.',
    h1: 'Troubleshooting', hero: 'engine-bay.jpg',
    intro: { eyebrow: 'About AirPro Mobile LLC', title: 'Aircraft Troubleshooting Services – AirPro Mobile',
      lead: 'Aircraft issues are not always obvious, and delays in finding the cause can lead to wasted time, unnecessary repairs, and longer downtime. That is why fast, accurate troubleshooting matters. At AirPro Mobile LLC, we provide focused aircraft troubleshooting services in Florida to support aircraft owners, operators, and aviation businesses that need answers before small issues turn into larger operational problems.',
      after: 'Our approach is built around identifying the actual source of the problem. Whether the issue involves engine behavior, avionics concerns, electrical faults, or system irregularities, we diagnose it clearly and move toward the right fix as efficiently as possible.',
      img: 'engine-bay.jpg', img2: 'avionics-panel.jpg' },
    blocks: [
      { t: 'text', title: 'What Is Troubleshooting in Aviation?', img: 'mechanic-hangar.jpg', paras: [
        'Troubleshooting is the process of identifying, isolating, and resolving a problem within a system. In aviation, that means examining symptoms, checking components, and testing systems until the actual cause is confirmed.',
        'This matters because aircraft problems are rarely solved well through assumptions. A warning light, performance issue, or system fault may point to several possible causes. Proper troubleshooting helps prevent unnecessary part replacement, reduces downtime, and supports safer, more accurate maintenance decisions.'] },
      { t: 'cards', dark: true, eyebrow: 'AirPro Mobile LLC', title: 'Our Troubleshooting Services', items: [
        ['Systems & Component Diagnostics', 'We conduct deep-tier inspections of airframe and powerplant systems to isolate intermittent faults, mechanical wear, and systemic irregularities. Our process ensures all components meet Type Certificate data sheet specifications.'],
        ['Avionics & Software Integration', 'We specialize in diagnosing FMS (Flight Management System) anomalies, software version conflicts, and avionics interface errors. We ensure that integrated modular avionics (IMA) function seamlessly within the aircraft\'s digital architecture.'],
        ['Data Bus & Connectivity Resolution', 'We resolve complex communication failures across onboard networks, including ARINC 429, 664 (AFDX), and CAN bus protocols. From SATCOM connectivity to high-speed internal data transfer, we ensure zero-latency system talk-back.'],
        ['Reliability & Return to Service', 'Beyond the initial fix, we focus on MTBF (Mean Time Between Failures) optimization. All corrective actions are performed in accordance with AMM (Aircraft Maintenance Manual) procedures to ensure a safe and compliant return to service.']] },
      { t: 'text', title: 'Common Issues We Fix', img: 'engine-open.jpg', paras: ['Our troubleshooting support is often used for problems such as:'],
        list: ['System faults or warning indications', 'Slow or irregular aircraft system response', 'Connectivity or communication issues between systems', 'Software and avionics-related errors', 'Hard-to-trace performance problems', 'Recurring issues that have not been properly resolved'],
        after: ['These types of problems often require a methodical approach rather than a quick assumption.'] },
      { t: 'split', left: { title: 'Why Choose Us', paras: ['AirPro Mobile LLC is built around practical, responsive aircraft support.'],
          list: ['Experienced technicians', 'Fast response and focused diagnostics', 'Reliable mobile service', 'Clear communication throughout the process', 'Support for aircraft owners and operators across the U.S.'] },
        right: { title: 'Industries We Serve', paras: ['We provide troubleshooting support for:'],
          list: ['Private aircraft owners', 'Charter and commercial operators', 'Aviation businesses and support providers', 'Flight operations and related sectors'],
          after: ['If your aircraft has an issue that needs a clear answer, AirPro Mobile LLC is ready to help. Contact us today to get a quote or schedule aircraft troubleshooting services in Florida and across the United States.'] } }
    ],
    faq: [
      ['What is troubleshooting?', 'Troubleshooting is the process of identifying and resolving the root cause of an aircraft or system problem.'],
      ['How long does it take?', 'It depends on the complexity of the issue. Some faults can be isolated quickly, while others require deeper diagnostics.'],
      ['Do you offer remote support?', 'Remote guidance may be available in certain situations, but many aircraft issues require on-site evaluation for accurate diagnosis.']]
  },

  'pre-post-flights': {
    title: 'Aircraft Pre Flight Inspection Florida | AirPro Mobile',
    desc: 'AirPro Mobile provides aircraft pre and post flight inspections in Florida. Mobile technicians ensure aircraft safety, compliance, and flight readiness.',
    h1: 'Pre/Post Flights', hero: 'jet-stairs.jpg',
    intro: { eyebrow: 'About AirPro Mobile LLC', title: 'Pre & Post Flight Services – AirPro Mobile LLC',
      lead: 'Aircraft readiness does not start at takeoff, and it does not end at landing. Proper Pre/Post Flight support helps operators catch issues early, maintain safety standards, and keep aircraft prepared for the next leg of operation.',
      after: 'At AirPro Mobile LLC, we provide practical aircraft pre flight inspection and post-flight service support designed to help owners, operators, and aviation businesses protect aircraft condition, reduce avoidable downtime, and stay ahead of maintenance concerns. Contact us to learn more.',
      img: 'jet-stairs.jpg', img2: 'jet-wing.jpg' },
    blocks: [
      { t: 'text', title: 'Pre-Flight Services', img: 'jet-wing.jpg', paras: [
        'Pre-flight service is about making sure the aircraft is ready before it leaves the ground. Our aircraft inspection services go beyond a quick walk-around by checking key systems, reviewing visible condition, and identifying anything that may affect safety, performance, or compliance before departure.',
        'Our pre-flight support helps operators confirm that the aircraft is properly prepared for use. This is especially useful when time is limited, schedules are tight, or the aircraft has been sitting between flights. The goal is to reduce risk, improve confidence before departure, and make sure no obvious issue is missed.'] },
      { t: 'text', dark: true, eyebrow: 'AirPro Mobile', title: 'Post-Flight Services', img: 'twin-ramp.jpg', paras: [
        'Post-flight service is just as important because that is often when new issues become visible. A flight may reveal wear, fluid loss, system irregularities, damage, or operational concerns that were not obvious beforehand.',
        'Our post-flight support focuses on identifying those problems early so they can be addressed before they become larger maintenance issues. This helps operators maintain aircraft condition, plan repairs more efficiently, and avoid unnecessary delays before the next flight. Post-flight service is also an important part of keeping maintenance records and operational standards consistent over time.'] },
      { t: 'steps', eyebrow: 'AirPro Mobile LLC', title: 'Our Process', intro: 'Every aircraft and operating environment is different, but our process stays structured and focused.', items: [
        ['Visual Inspection', 'We review the visible condition of the aircraft and check for signs of wear, damage, leaks, or irregularities.'],
        ['System Checks', 'We inspect relevant systems and confirm that key operational areas are performing as expected.'],
        ['Fuel & Fluid Checks', 'Fuel and fluid levels are reviewed, along with signs of contamination, leakage, or servicing needs.'],
        ['Safety Compliance', 'Service support is performed with attention to aviation safety standards and proper operational procedures.'],
        ['Documentation', 'Findings are recorded clearly so operators have a usable reference for follow-up maintenance or reporting.']] },
      { t: 'split', left: { title: 'Why Choose AirPro Mobile', paras: ['AirPro Mobile LLC provides pre/post flight support with the same practical approach we bring to the rest of our aircraft services.'],
          list: ['Certified technicians', 'FAA-conscious service standards', 'Fast turnaround', 'Mobile on-site support', 'Detailed reporting'],
          after: ['Our team focuses on accuracy, responsiveness, and clear communication so operators can make informed decisions without wasting time.'] },
        right: { title: 'Industries We Serve', paras: ['We provide service support for a range of aviation operations, including:'],
          list: ['Commercial aviation', 'Private jets', 'Charter services', 'Cargo operations', 'Government and military support environments'],
          after: ['Each operation has different timing, reporting, and aircraft readiness requirements. We help support those needs with service that fits the pace of real-world aviation.'] } }
    ],
    faq: [
      ['What is an aircraft pre-flight inspection?', 'An aircraft pre-flight inspection is a detailed check performed before departure to verify that the aircraft is safe and ready for flight. It includes reviewing key systems, checking visible components, and identifying any issues that could affect safety or performance.'],
      ['Why are aircraft inspection services important?', 'Aircraft inspection services help identify wear, damage, leaks, or system issues before they become larger maintenance problems. Regular inspections improve safety, reduce unexpected downtime, and help keep aircraft ready for operation.'],
      ['What is included in your pre-flight inspection service?', 'Our aircraft pre-flight inspection includes a visual inspection, system checks, fuel and fluid checks, safety compliance reviews, and clear documentation of any findings. The goal is to ensure the aircraft is prepared for safe and efficient operation.'],
      ['Do you provide mobile aircraft inspection services in Florida?', 'Yes. AirPro Mobile provides aircraft inspection services throughout Florida, including mobile pre-flight and post-flight inspections. Our technicians come directly to your location to help keep your aircraft flight-ready.'],
      ['Why should I schedule a post-flight inspection?', 'A post-flight inspection helps identify issues that may develop during flight, such as fluid leaks, system irregularities, or visible wear. Detecting these concerns early allows for timely maintenance and helps prepare the aircraft for its next flight.']],
    cta: { title: 'Contact Us Today!', paras: ['If you need dependable Pre/Post Flight support, AirPro Mobile LLC is ready to assist. Whether you are preparing for departure, checking aircraft condition after arrival, or looking for ongoing operational support, we bring experienced service directly to your location.', 'Contact us today to schedule service and keep your aircraft ready for the next flight.'] }
  },

  'avionics-service': {
    title: 'Avionics Repair Services Florida | AirPro Mobile',
    desc: 'AirPro Mobile provides avionics repair services in Florida, including diagnostics, installations, and aircraft avionics support from certified mobile technicians.',
    h1: 'Avionics Service', hero: 'avionics-panel.jpg',
    intro: { eyebrow: 'About AirPro Mobile', title: 'Avionics Service You Can Trust Across Florida',
      lead: 'Modern aircraft rely on avionics for far more than convenience. Navigation, communication, situational awareness, and compliance all depend on systems that need to work properly every time the aircraft leaves the ground. At AirPro Mobile LLC, our avionics service in Florida offers reliable service, fast response, and practical on-site support across Florida.',
      after: 'We provide mobile avionics diagnostics, repair, installation, and upgrade services for a wide range of aircraft and operators. Instead of adding delays through unnecessary repositioning or extended downtime, we bring experienced support directly to your location. Whether the need is routine maintenance, troubleshooting, or system upgrades, our focus stays on accurate work, FAA-conscious service, and dependable results.',
      img: 'avionics-panel.jpg', img2: 'cockpit-pilots.jpg' },
    blocks: [
      { t: 'text', title: 'Our Avionics Services', img: 'cockpit-pilots.jpg', paras: ['Our avionics services include:'], sub: [
        { h: 'Inspection & Diagnostics', paras: ['Avionics issues are not always obvious at first. A communication fault, navigation inconsistency, or display problem can come from more than one source. That is why inspection and diagnostics are a critical part of our service.', 'We provide:'], list: ['Full System Evaluation', 'Troubleshooting and Fault Isolation', 'Compliance Checks'] }] },
      { t: 'triple', dark: true, eyebrow: 'AirPro Mobile', cols: [
        { title: 'Repair & Maintenance', paras: ['Avionics systems need regular attention to stay dependable. Waiting until a problem becomes disruptive usually leads to more downtime and a more expensive repair path.', 'Our repair and maintenance support includes:'], list: ['Avionics System Repair', 'Preventive Maintenance programs', 'Component Replacement'] },
        { title: 'Installation & Upgrades', paras: ['Aircraft avionics requirements continue to evolve. Operators often need newer systems, better integration, and equipment that supports modern operational and regulatory needs.', 'We provide installation and upgrade services for:'], list: ['GPS, Navigation, and Communication Systems', 'Glass Cockpit Upgrades', 'ADS-B compliance solutions'] },
        { title: 'Mobile Avionics Support', paras: ['One of the biggest advantages of working with us at AirPro Mobile LLC is mobility. Our aircraft avionics service is brought directly to your aircraft, which helps reduce downtime and avoid unnecessary aircraft movement. That means:'], list: ['On-Site Service anywhere in the U.S.', 'Reduced Downtime', 'Flexible Scheduling based on operational needs'], after: ['As a veteran-owned, Florida-based business, AirPro Mobile LLC is committed to delivering dependable service with a clear focus on quality and accountability.'] }] },
      { t: 'text', eyebrow: 'airpro mobile', title: 'Why Choose Our Avionics Service', img: 'citation-nose.jpg', paras: [
        'AirPro Mobile LLC combines technical experience with responsive support, providing avionics repair services in South Florida for aircraft owners and operators. Our team understands that avionics issues affect more than one system. They affect scheduling, compliance, safety, and confidence in the aircraft itself.',
        'We provide FAA-certified technical support, nationwide mobile response, and service designed to reduce delays. Our experience across multiple aircraft types helps us adapt quickly to different operational environments. Every job is handled with close attention to safety, proper procedures, and the need to return aircraft to dependable service as efficiently as possible.'] },
      { t: 'split', left: { title: 'Industries & Aircraft We Serve', paras: ['Our avionics support is available for a wide range of aviation operations, including:'],
          list: ['Commercial aviation', 'Private jets', 'Helicopters', 'Cargo aircraft', 'Government and defense aircraft'],
          after: ['Different aircraft and operators have different priorities, but reliable avionics remain essential in every category.'] },
        right: { title: 'Compliance & Certifications', paras: ['Avionics work must be handled correctly. AirPro Mobile LLC follows FAA regulations and established service standards to ensure the work supports both safety and compliance. Our service includes:'],
          list: ['Adherence to FAA requirements', 'Certified avionics technicians', 'Internal quality assurance processes'],
          after: ['That structure helps ensure work is completed accurately and documented properly.'] } },
      { t: 'steps', eyebrow: 'AirPro Mobile LLC', title: 'Service Process at AirPro Mobile', intro: 'Our avionics support follows a clear process:', items: [
        ['Request & consultation', 'We review the issue, aircraft type, and service need.'],
        ['On-site assessment', 'A technician evaluates the system and confirms the scope of work.'],
        ['Service execution', 'Diagnostics, repair, maintenance, or installation are carried out.'],
        ['Testing & certification', 'Systems are checked to confirm proper operation and required standards.'],
        ['Ongoing support', 'Follow-up support is available as needed.']] }
    ],
    faq: [
      ['What are aircraft avionics services?', 'Aircraft avionics services include the inspection, repair, maintenance, installation, and upgrade of aircraft electronic systems such as navigation, communication, GPS, and flight instrumentation. These services help keep aircraft operating safely and efficiently.'],
      ['Do you provide avionics services throughout Florida?', 'Yes. AirPro Mobile provides avionics services in Florida for private aircraft owners, charter operators, commercial aviation, and other aviation businesses. Our mobile technicians deliver on-site support to help reduce downtime and keep aircraft operational.'],
      ['What types of avionics systems can you service?', 'Our team works with a variety of avionics systems, including GPS, navigation equipment, communication systems, glass cockpit displays, and ADS-B solutions. We also provide diagnostics, troubleshooting, repairs, and system upgrades based on your aircraft\'s needs.'],
      ['Do you offer mobile avionics repair at my location?', 'Yes. AirPro Mobile provides mobile avionics support by bringing experienced technicians directly to your aircraft. On-site service helps minimize downtime and eliminates the need to move your aircraft to a maintenance facility whenever possible.'],
      ['Do you provide avionics repair services in South Florida?', 'Yes. AirPro Mobile offers avionics repair services in South Florida with mobile diagnostics, repairs, maintenance, and system upgrades. Our technicians focus on reliable workmanship, FAA-conscious procedures, and responsive support for a wide range of aircraft.']],
    cta: { title: 'Keep Your Avionics Performing at Their Best', paras: ['Reliable avionics are essential to safe and efficient aircraft operation. If your aircraft needs diagnostics, repair, upgrades, or ongoing support, AirPro Mobile LLC is ready to help. Contact us today to schedule professional avionics service anywhere in Florida.'] }
  }
};

/* ---------- Blog posts (full articles) ---------- */
// Format: lines prefixed with  'h2 ', 'h3 ', 'li ' or plain paragraphs.  'q ' = FAQ question, next line answer.
const posts = [
  { slug: 'what-is-aog-aircraft-maintenance', date: 'October 29, 2026', img: 'aog-1.jpg',
    title: 'AOG Maintenance Services – Aircraft-on-Ground Emergency Support',
    seoTitle: 'What Is AOG Aircraft Maintenance? Emergency Support',
    desc: 'Learn how AOG aircraft maintenance works, common causes of aircraft grounding, and how emergency support helps coordinate troubleshooting and repairs.',
    body: `An Aircraft-on-Ground (AOG) situation occurs when an aircraft cannot operate as planned because of a technical problem or maintenance-related discrepancy. Engine faults, avionics failures, and unexpected inspection findings can interrupt flight schedules and leave operators needing immediate technical assistance.
Aircraft on Ground service helps operators identify problems, arranges qualified maintenance personnel, coordinates repairs, and completes the procedures necessary for an authorized return to service.
At AirPro Mobile, we provide mobile aircraft maintenance support across Florida, including emergency troubleshooting and on-site repairs. Understanding how AOG response works helps aircraft owners and operators prepare for unexpected downtime and make informed maintenance decisions. If you are searching “aircraft mechanic near me,” read this blog to the very end.
h2 What Are AOG Maintenance Services?
AOG maintenance addresses unexpected technical problems that prevent an aircraft from operating. Compared to scheduled inspections or preventive maintenance, these situations require prompt evaluation because the aircraft is already unavailable for its intended operation.
Qualified aviation maintenance professionals examine reported discrepancies, identify necessary corrective actions, and perform work within their authorized capabilities.
The scope may include inspections, component replacement, engine troubleshooting, or avionics-related maintenance.
Professional AOG aviation support also involves coordinating equipment, replacement parts, and maintenance documentation. The objective is to address the discrepancy efficiently while meeting applicable airworthiness and regulatory requirements.
h2 Common Reasons an Aircraft Goes AOG
Aircraft may become grounded because of a mechanical defect, system malfunction, or maintenance finding that needs attention before departure. Common causes include:
li **Engine problems:** Abnormal indications, fluid leaks, starting difficulties, or performance concerns.
li **Avionics malfunctions:** Problems involving communication, navigation, displays, or other required equipment.
li **Component failures:** Defective electrical, hydraulic, landing gear, or other aircraft systems.
li **Inspection discrepancies:** Maintenance findings requiring correction before further operation.
li **Parts delays:** Replacement components or specialized equipment unavailable at the aircraft’s location.
An AOG aircraft may require anything from troubleshooting a localized fault to completing extensive corrective maintenance. The complexity of AOG repairs depends on the aircraft type, affected system, maintenance instructions, and availability of qualified personnel and approved replacement parts.
h2 How Does the AOG Maintenance Process Work?
An organized response helps operators communicate technical information, identify maintenance requirements, and coordinate available resources.
h3 1. Report the Aircraft Issue
The operator contacts the maintenance provider with the aircraft type, location, registration, reported symptoms, and relevant maintenance history. Accurate information supports initial planning.
h3 2. Assess and Troubleshoot the Problem
Qualified personnel review the reported discrepancy and inspect the aircraft as appropriate. Troubleshooting follows applicable maintenance instructions to establish the likely source of the fault.
h3 3. Coordinate Maintenance and Required Parts
Depending on the findings, AOG support may involve arranging replacement components, specialized tooling, technical documentation, and access to the aircraft.
h3 4. Complete Repairs and Required Checks
Authorized personnel perform the necessary corrective work and applicable inspections or operational checks. Maintenance actions and findings must be documented under relevant requirements.
h3 5. Confirm Return-to-Service Authorization
The aircraft cannot resume operation solely because a repair appears complete. Appropriate authorized personnel must approve its return to service under applicable FAA requirements. Effective aircraft AOG support connects these steps while keeping operators informed of progress and outstanding requirements.
h2 Why Is Timely AOG Support Important?
An unexpected grounding affects flight schedules, passenger arrangements, aircraft availability, and operational planning. For commercial operators, delays may also affect subsequent flights and crew scheduling.
Timely troubleshooting helps establish what needs attention and whether suitable maintenance resources are available locally.
Professional AOG services provide an organized approach to coordinating technicians, parts, technical information, and required inspections.
Clear communication is equally important. Operators need realistic updates about maintenance progress, unresolved discrepancies, and potential scheduling implications.
Although quick intervention may reduce avoidable delays, repair duration depends on technical findings, parts availability, and applicable maintenance requirements. Airworthiness remains the priority throughout the process.
h2 When Should You Contact an AOG Maintenance Provider?
Contact a qualified maintenance provider when an unexpected technical problem prevents an aircraft from operating or requires evaluation before the next flight.
Professional assistance may also be needed when:
li An inspection identifies a discrepancy requiring corrective action.
li Specialized troubleshooting is unavailable at the current airport.
li Replacement components or maintenance equipment need coordination.
li The aircraft requires on-site technical assistance.
When requesting support, provide accurate aircraft details, current location, fault indications, and relevant maintenance records.
Early communication helps the provider assess the request and determine which resources may be necessary.
h2 Get Aircraft Maintenance Support from AirPro Mobile
At AirPro Mobile, we provide 24/7 emergency aircraft maintenance support for owners and operators across Florida.
Based in Stuart, our mobile team offers on-site diagnostics, aircraft inspections, component replacement, and corrective maintenance for supported aircraft.
Our [AOG Maintenance Services](/services/aog-maintenance/) focus on identifying technical problems and coordinating appropriate maintenance with attention to FAA requirements.
When unexpected downtime affects your operation, contact a qualified [Mobile Aircraft Mechanic](/contact-us/) to discuss your aircraft maintenance needs.
Call [561-203-3813](tel:5612033813) or visit our [AOG maintenance service page](/services/aog-maintenance/) to request assistance.
h2 Frequently Asked Questions
q What Does AOG Mean in Aviation?
AOG means Aircraft on Ground. It describes an aircraft unable to operate as planned because of a technical problem or other issue requiring resolution.
q What Do AOG Maintenance Services Include?
Services may include inspections, troubleshooting, corrective repairs, component replacement, and maintenance coordination. The exact scope depends on the reported fault and provider capabilities.
q How Quickly Can an AOG Aircraft Be Repaired?
Repair duration depends on the fault, aircraft type, parts availability, technician access, and required checks. There is no universal turnaround time.
q Can AOG Maintenance Be Performed at an Airport or Remote Location?
Yes, when qualified personnel, appropriate tools, necessary permissions, and suitable working conditions are available. Certain repairs may require specialized facilities.
q What Information Should I Provide When Requesting AOG Support?
Provide the aircraft type, registration, current location, reported discrepancy, relevant maintenance records, and contact details for coordination.` },

  { slug: 'aog-maintenance-services-aircraft-recovery', date: 'October 19, 2026', img: 'aog-2.jpg',
    title: 'AOG Maintenance Services – A Practical Recovery Plan for Aircraft Operators',
    seoTitle: 'AOG Maintenance Services: Recovery Tips for Operators',
    desc: 'Learn how AOG maintenance services help aircraft operators manage unexpected groundings, coordinate repairs, control downtime, and plan recovery.',
    body: `An Aircraft-on-Ground (AOG) event can disrupt an entire flight operation. When an unexpected technical issue prevents an aircraft from departing, operators must consider maintenance requirements, available resources, flight schedules, and the cost of extended downtime.
AOG Maintenance Services provide access to qualified technical assistance when an aircraft requires urgent attention. However, arranging maintenance is only part of managing the disruption. Clear communication, accurate fault information, and realistic coordination also matter.
At AirPro Mobile, we support aircraft owners and operators across Florida with mobile maintenance assistance. Here’s what operators need to consider when preparing for an unexpected grounding.
h2 The Operational Challenges Behind an Aircraft Grounding
A grounded aircraft affects more than its scheduled departure. Charter operators may need to reorganize passenger arrangements, while private owners could face extended stays and additional operating expenses.
For an AOG aircraft away from its usual maintenance base, even straightforward repairs may require external technicians, specialized equipment, or replacement parts.
The immediate priority is determining what assistance is needed and what resources are available at the aircraft’s location. Reliable AOG aviation coordination involves maintaining communication between the aircraft operator, maintenance personnel, and any other parties responsible for supporting the operation.
h2 What Information Helps Maintenance Teams Respond Effectively?
When requesting AOG maintenance, accurate technical information helps the provider evaluate the situation before arranging on-site assistance. Operators should have the following information available:
li **Aircraft details:** Make, model, registration, and relevant configuration information.
li **Current location:** Airport, hangar, parking position, and applicable access arrangements.
li **Reported discrepancy:** Warning indications, observed symptoms, and circumstances surrounding the issue.
li **Maintenance records:** Recent work, outstanding discrepancies, and relevant logbook information.
li **Operational requirements:** Contact details, scheduling considerations, and access to the aircraft.
Providing this information helps avoid unnecessary clarification and supports maintenance planning. It also allows technicians to identify whether additional documentation, equipment, or specialist assistance may be required.
h2 Why Does the Aircraft’s Location Matter?
An aircraft grounded at its home hangar may have convenient access to familiar maintenance resources. The situation can become more complicated at a regional airport or unfamiliar facility.
Mobile aircraft AOG support helps address this challenge by bringing qualified maintenance personnel to the aircraft when appropriate.
However, airport access, available working space, facility restrictions, and necessary equipment influence what can be completed on-site.
For certain repairs, access to a properly equipped hangar or specialized maintenance facility may be necessary. Operators benefit from confirming local access arrangements early, so maintenance personnel can plan their work appropriately.
h2 How Does Parts Availability Affect Recovery?
Identifying a faulty component does not necessarily mean a replacement is immediately available. Aircraft parts must meet applicable eligibility, documentation, and installation requirements. Depending on the aircraft, locating a suitable replacement may involve coordination with approved suppliers or maintenance organizations.
Effective AOG support includes understanding these logistical requirements and communicating realistic expectations. Parts shortages can extend downtime even when the technical problem has already been identified.
In some situations, additional troubleshooting may establish that a different corrective action is appropriate. Such decisions must follow the aircraft’s applicable maintenance instructions and regulatory requirements.
h2 What Determines the Cost of Emergency Aircraft Maintenance?
Emergency maintenance expenses vary according to aircraft type, technical complexity, location, and the resources required.
Common cost considerations include technician labor, travel time, replacement components, specialized equipment, and after-hours assistance.
Some providers also apply additional callout charges for urgent requests. When comparing AOG services, aircraft owners should ask how travel, labor, parts, and additional maintenance requirements will be billed.
At AirPro Mobile, operators can discuss their specific requirements, including emergency callout provisions, before arranging assistance. An estimate may change if troubleshooting reveals additional work.
h2 Why Documentation Matters After Emergency Repairs
Completing corrective maintenance is only one requirement for returning an aircraft to operation. Maintenance records must accurately describe the work performed and include information required by applicable FAA regulations.
Appropriate authorized personnel must also approve the aircraft for return to service when required. Professional AOG aviation services account for these obligations throughout the maintenance process.
Incomplete records or unresolved discrepancies can prevent an aircraft from returning to operation, even when the immediate technical concern appears to have been addressed. Operators should confirm that the necessary documentation and approvals are complete before resuming flight.
h2 Can Better Maintenance Planning Reduce AOG Disruptions?
Unexpected failures cannot always be prevented, but preparation can make disruptions easier to manage.
Keeping maintenance records organized, following inspection schedules, and addressing recurring discrepancies may help identify developing problems.
Operators can also maintain current maintenance-provider contacts and familiarize themselves with support arrangements at frequently visited airports.
Pre-flight and post-flight inspections remain important opportunities to identify discrepancies requiring attention. A contingency plan should establish who coordinates technical assistance, communicates operational changes, and authorizes maintenance expenses.
This planning supports more organized decision-making when emergency AOG repairs become necessary.
h2 Arrange Emergency Aircraft Support With AirPro Mobile
AirPro Mobile provides 24/7 mobile aircraft maintenance assistance throughout Florida, including diagnostics, component replacement, and on-site corrective work within available capabilities.
Our Stuart-based team supports owners and operators facing unexpected technical problems. Whether you need troubleshooting or broader coordination, our [AOG Maintenance Services](/services/aog-maintenance/) help address maintenance requirements at your aircraft’s location. Contact a qualified [Mobile Aircraft Mechanic](/contact-us/) or call [561-203-3813](tel:5612033813) to discuss your aircraft and request assistance.
q What Should Operators Do During Extended Downtime?
Maintain communication with maintenance personnel, confirm outstanding requirements, review operational arrangements, and establish realistic expectations based on technical findings.` },

  { slug: 'aog-aircraft-maintenance-florida-emergency-repair-costs', date: 'September 23, 2026', img: 'aog-3.jpg',
    title: 'Which AOG services offer the best flat-rate emergency repairs and how do those flat rates compare in USD?',
    seoTitle: 'AOG Emergency Repair Costs: Flat Rates & Pricing Guide',
    desc: 'Compare AOG emergency repair pricing, flat-rate services, hourly labor, travel fees, and other costs for aircraft maintenance in Florida.',
    body: `An Aircraft on Ground, or AOG, situation means an aircraft cannot operate because of a mechanical, technical, or system-related issue. For owners, charter operators, flight schools, and other aviation businesses, that interruption can quickly affect schedules, passengers, crews, and operating costs.
That is why AOG aircraft maintenance in Florida needs to combine technical capability with rapid response and clear pricing. The cheapest advertised rate does not always produce the lowest final invoice. Travel time, troubleshooting, minimum callouts, after-hours labor, parts, and the complexity of the aircraft all influence the actual cost.
h2 What Is AOG Aircraft Maintenance?
AOG Aircraft Maintenance is unscheduled maintenance performed when a technical problem keeps an aircraft from operating. Common causes include engine issues, electrical faults, charging or starting problems, avionics discrepancies, component failures, and other mechanical concerns.
Routine maintenance is usually planned around the aircraft’s operating schedule. An aircraft AOG event works differently. The problem already exists, and the priority is identifying it, determining the required maintenance, and completing appropriate work as efficiently as circumstances allow.
At AirPro Mobile, our mobile approach brings technical support to the aircraft rather than requiring every maintenance event to begin with repositioning to a shop.
h2 What Services Are Included in AOG Maintenance?
The exact scope depends on the discrepancy, aircraft, location, and maintenance required. Typical AOG Maintenance Services may include troubleshooting, aircraft inspection, on-site repairs, component replacement, engine-related support, and return-to-service assistance when applicable.
Our Florida AOG service specifically includes emergency diagnostics, on-site repair capability, component replacement when required, and support through the return-to-service process. We also provide broader aircraft technical support, including troubleshooting and engine maintenance.
h2 How Does AOG Emergency Repair Pricing Work?
One important distinction is between a true flat-rate service and an hourly AOG rate.
A flat rate sets a predetermined labor price for a defined task. That structure works particularly well when the scope is predictable, such as certain inspections or standardized component work. Emergency aircraft troubleshooting is harder to price that way because the extent of the fault may be unknown until a technician begins diagnosis.
h2 What Affects the Cost of AOG Services?
An advertised labor rate is only one part of an AOG invoice. The final amount may depend on the aircraft category, severity of the discrepancy, diagnostic time, required parts, technician travel, location, response timing, and whether additional personnel are required.
Travel policies deserve particular attention. Some mobile providers charge travel at their applicable hourly labor rate, while others use callout or trip charges. Parts, consumables, freight, and component exchanges may also sit outside the base labor figure.
This is why comparing two numbers without comparing what they include can give operators a distorted picture of actual cost.
h2 Are Flat-Rate AOG Repairs Actually Common?
Based on currently published pricing, completely flat-rate emergency aircraft repair appears less common than hourly AOG labor, minimum callouts, or quoted repair packages.
Some aviation businesses do offer flat-rate structures for predictable work. For an unpredictable Aircraft AOG event, hourly or quoted pricing may provide a more realistic structure because the technician does not know the full scope before troubleshooting begins.
h2 Why Choose Mobile AOG Support in Florida?
Moving a grounded aircraft simply to begin diagnosis may add another logistical problem to an already disruptive situation.
Our AOG Aircraft Maintenance in Florida brings mobile support directly to hangars and aircraft locations across the state. Technicians can inspect the reported fault on-site, troubleshoot the system, complete appropriate repairs when possible, and determine what additional action may be required. AirPro Mobile also provides 24/7 AOG support, including after-hours and weekend response.
That approach can reduce unnecessary movement of the aircraft and shorten the path from initial fault assessment to an actionable maintenance decision.
h2 What Should You Look for in an AOG Maintenance Provider?
Start with response capability and technical fit rather than price alone. Ask whether the provider supports your aircraft category, how travel is billed, whether after-hours charges apply, what minimums exist, how parts are handled, and when you will receive an estimate.
Communication is equally important. Professional AOG Support should give the operator a clear picture of what has been found, what work is recommended, what it is expected to cost, and what may change once troubleshooting progresses.
h2 Why Is Transparent AOG Pricing Important?
An AOG event already creates operational uncertainty. Pricing should not add another layer. Clear labor rates, callout charges, travel policies, and estimates allow operators to understand the likely financial commitment before authorizing work. They also make competing AOG Services easier to compare on meaningful terms rather than relying on a single headline rate.
h2 Get AOG Aircraft Maintenance Support in Florida
At AirPro Mobile, we provide mobile diagnostics, troubleshooting, repairs, component support, and emergency [AOG Maintenance](/services/aog-maintenance/) across Florida. Our technicians travel to the aircraft, assess the discrepancy, and work toward an appropriate repair or next maintenance action.
For current AOG pricing, availability, and response information, contact AirPro Mobile directly before dispatch. Pricing can change, and the aircraft type, location, timing, and specific discrepancy all influence the final service cost.` },

  { slug: 'what-are-mobile-aircraft-maintenance-teams', date: 'September 22, 2026', img: 'mobile-teams.jpg',
    title: 'What Are Mobile Aircraft Maintenance Teams?',
    seoTitle: 'What Are Mobile Aircraft Maintenance Teams? | AirPro Mobile',
    desc: 'Learn how mobile aircraft maintenance teams provide on-site aircraft repair, engine troubleshooting, turbine repair, and 24/7 AOG support across Florida.',
    body: `Aircraft issues do not always happen near a maintenance facility. An engine concern may appear at a regional airport, inside a private hangar, or just before a scheduled departure. Mobile aircraft maintenance teams bring qualified technicians, diagnostic capability, and repair support directly to the aircraft.
At AirPro Mobile, we provide on-site maintenance and repair support throughout Florida, including scheduled work and 24/7 AOG response. Our mobile model helps aircraft owners and operators address mechanical issues without automatically repositioning the aircraft to a traditional shop.
h2 What Are Mobile Aircraft Maintenance Teams?
A mobile aircraft maintenance team performs inspection, troubleshooting, maintenance, and eligible repairs at the aircraft’s location.
Instead of bringing every aircraft issue into a fixed maintenance facility, technicians travel to the hangar, airport, or job site with the tools and technical support required for the task. This approach works particularly well for scheduled line maintenance, troubleshooting, engine concerns, and Aircraft on Ground situations.
Traditional Aircraft MRO facilities remain essential for work that requires extensive shop infrastructure. Mobile Maintenance fills a different role by bringing practical Aviation MRO support closer to the aircraft when the work can be completed safely and appropriately on-site.
h2 What Services Do Mobile Aircraft Maintenance Teams Provide?
The scope depends on the aircraft, technical issue, and work required. At AirPro Mobile, our Aircraft Services include scheduled and corrective Aircraft Maintenance, troubleshooting, engine support, AOG Services, avionics work, oxygen servicing, and pre/post-flight support. We work with aircraft ranging from single-engine and light twins to turboprops, helicopters, jets, and turbine aircraft. A mobile team may provide:
li Engine Maintenance and troubleshooting
li Aircraft Repair
li Component replacement
li Turbine Repair support
li Diagnostics and fault isolation
li Routine maintenance
li AOG response
li Pre-flight and post-flight services
li Support around Engine Repair or further Engine Overhaul requirements
Not every engine issue can be resolved in the field. The initial inspection helps determine whether on-site work is appropriate or whether the aircraft or component needs a different repair path.
h2 How Does Mobile Aircraft Engine Repair Work?
Mobile Aircraft Engine Repair begins with understanding the symptoms rather than immediately replacing parts.
Our technicians inspect the aircraft and troubleshoot the issue to identify the likely source. Engine performance concerns can stem from wear, heat stress, component problems, fuel-system issues, or other irregularities, so accurate diagnostics guide the next step.
Once the cause is identified, we determine whether the required work can be completed on-site. Eligible repairs or component replacement can then move forward, followed by testing and final checks appropriate to the work performed.
This approach gives owners and operators a clearer repair path while limiting unnecessary aircraft movement.
h2 Why Mobile Aircraft Maintenance Can Reduce Operational Disruption
Time on the ground affects more than the maintenance schedule. A grounded aircraft can disrupt passengers, crew assignments, charter commitments, cargo schedules, positioning flights, and other operating plans. For private owners, it may interrupt an entire trip.
Mobile Repair reduces one step in that process by bringing maintenance support to the aircraft. For an AOG event, our technicians can be dispatched to inspect the aircraft, diagnose the issue, perform eligible repairs, replace components where required, and support the return-to-service process. AirPro Mobile provides 24/7 AOG response across Florida, including after-hours and weekend availability.
The benefit is practical: the maintenance response begins where the aircraft is already located.
h2 When Do You Need Mobile Aircraft Repair Services?
Some situations are clearly urgent. Others begin as smaller performance concerns that deserve investigation before they become more disruptive. Mobile Aircraft Repair can be useful when:
li An aircraft is grounded unexpectedly
li An engine develops an unfamiliar indication or performance issue
li A mechanical fault appears away from the usual maintenance base
li Routine maintenance is due at the aircraft’s location
li A component needs inspection or replacement
li A pre-flight or post-flight check identifies a concern
li AOG Services are required outside standard operating hours
Early troubleshooting can also help avoid unnecessary corrective work by identifying the actual source of a problem before a repair plan is created.
h2 Why Use Professional Turbine Engine Repair Support?
Turbine systems require engine-specific knowledge, disciplined diagnostics, and repair procedures aligned with applicable aviation requirements.
Our Turbine Engine Repair support includes inspection, troubleshooting, and corrective work for turbine aircraft. AirPro Mobile also supports turbofan, turboprop, and turbojet engine applications, with repair decisions based on the condition of the engine and affected components.
Professional Aviation Turbine Engine Repair also provides a structured path from symptom to diagnosis, repair planning, work completion, testing, and quality review. That becomes especially valuable when an operator is balancing technical requirements against an urgent operational schedule.
h2 Mobile Aircraft Maintenance Across Florida
Florida supports a large and varied aviation environment, from private and business aircraft to charter, flight-school, commercial, and cargo operations.
Our mobile model allows us to bring aircraft maintenance directly to airports, hangars, and operator locations throughout the state. AirPro Mobile is based in Stuart, Florida, and provides statewide support for scheduled maintenance as well as urgent AOG situations.
For operators dealing with engine problems, our [aircraft engine repair](/services/engine-repair/) service combines diagnostics, repair planning, turbine support, and mobile response where applicable. We also provide broader maintenance services when the aircraft requires support beyond the engine itself.
h2 Mobile Support Gives Aircraft Operators Another Maintenance Option
Mobile aircraft maintenance teams give owners and operators direct access to technical support without making a shop visit the automatic first step.
For routine maintenance, troubleshooting, AOG events, and eligible engine work, bringing the technician to the aircraft can shorten the path from identifying the problem to deciding what happens next.
AirPro Mobile provides mobile aircraft maintenance, AOG support, and Aircraft Engine Repair throughout Florida, with 24/7 emergency response available. Contact us at [Aircraft Mechanic](/contact-us/) to schedule mobile maintenance support or request assistance with an aircraft engine issue.` },

  { slug: 'why-regular-aircraft-oxygen-servicing-matters', date: 'September 16, 2026', img: 'oxygen.jpg',
    title: 'Why Regular Aircraft Oxygen Servicing Matters for Safe Aircraft Operations',
    seoTitle: 'Aircraft Oxygen System Maintenance Best Practices',
    desc: 'Learn the importance of Aircraft Oxygen System Maintenance for safe operations at high altitudes. Keep your oxygen systems ready.',
    body: `Supplemental oxygen systems are easy to overlook when they are working normally. Yet for aircraft operating at higher altitudes, oxygen availability can become an important operational and regulatory consideration.
For owners and operators, aircraft oxygen servicing in Stuart, FL, should be treated as part of aircraft readiness rather than something addressed only when cylinder pressure becomes noticeably low. At AirPro Mobile, we provide mobile [oxygen servicing](/services/oxygen-servicing/) from our Stuart, Florida base as part of our broader aircraft maintenance services.
h2 What Is Aircraft Oxygen Servicing?
Aircraft oxygen servicing involves maintaining the oxygen supply and checking relevant system components in accordance with the aircraft and equipment manufacturer’s requirements. Depending on the system and maintenance required, attention may involve:
li Checking oxygen quantity or cylinder pressure
li Refilling the system with the appropriate oxygen
li Inspecting cylinders and accessible components
li Looking for signs of leakage
li Examining fittings, connections, regulators, and delivery equipment as applicable
li Addressing irregular indications or system performance
li Completing maintenance required by the applicable inspection schedule
The FAA advises pilots to inspect oxygen storage containers, ensure they are properly secured, check equipment regularly, and follow manufacturer guidance. It also specifies that aviator’s breathing oxygen, rather than industrial or medical oxygen, is appropriate for gaseous aviation oxygen systems.
h2 Common Aircraft Oxygen System Issues
A low pressure indication may be obvious. Other problems can be less apparent. Aircraft owners and operators should pay attention to:
h3 Unexpected Pressure Loss
A cylinder that loses pressure faster than expected deserves investigation. Repeatedly topping off the system without determining why pressure is dropping may leave the underlying issue unresolved.
h3 Leaks and Connection Problems
Oxygen systems contain storage, regulating, and delivery components. Connections, valves, hoses, fittings, or other components can require inspection when system behavior changes.
h3 Cylinder Condition Concerns
The oxygen cylinder itself is part of the safety-critical system and needs to remain within applicable inspection and servicing requirements.
h3 Irregular System Performance
Problems with masks, cannulas, regulators, outlets, or indicators may affect how oxygen reaches occupants even when oxygen remains in the cylinder. The FAA recommends a preflight “PRICE” check covering pressure, regulator function, indicators, connections, and emergency readiness.
h2 Why Regular Oxygen System Maintenance Matters
An oxygen system may spend long periods unused and then become important during a high-altitude flight or abnormal event. That makes reliability particularly important. Regular servicing can help identify:
li Developing leaks
li Pressure irregularities
li Component deterioration
li Connection problems
li Cylinder concerns
li Problems that could affect system availability
Oxygen also requires special handling. The FAA warns that although oxygen itself is not flammable, it causes other materials to ignite more readily and makes fires burn more intensely. Oils and petroleum-based contamination must therefore be kept away from oxygen equipment, and proper precautions are required during servicing.
Professional aircraft oxygen servicing in Stuart, FL gives owners a practical way to include this system in their wider maintenance planning.
h2 When Should Aircraft Oxygen Systems Be Inspected?
There is no single servicing interval that applies to every aircraft and every oxygen system. Follow the aircraft manufacturer, oxygen-system manufacturer, inspection program, and other applicable maintenance requirements.
Beyond scheduled maintenance, an inspection may be appropriate when:
li Oxygen pressure drops unexpectedly
li A possible leak is suspected
li A valve, fitting, mask, regulator, or connection appears damaged
li The system gives an unusual indication
li The aircraft is being prepared for operations where supplemental oxygen will be important
li Previous maintenance identifies a related concern
Pilots should also check oxygen equipment before flight rather than assuming that a recently serviced system is automatically ready.
h2 Choosing the Right Aircraft Maintenance Provider
Oxygen servicing should be handled with the same attention to technical requirements and safe procedures as other aircraft maintenance.
When comparing an aircraft maintenance company, consider whether the provider offers:
li Appropriate aviation maintenance experience
li Technicians qualified for the work being performed
li Equipment suited to aviation oxygen servicing
li Procedures that account for oxygen-specific hazards
li Mobile support when on-site service is practical
li Clear communication about the work required
AirPro Mobile operates from Stuart, Florida, and provides mobile aircraft maintenance, including oxygen servicing, engine repair, inspections, AOG maintenance, avionics support, and other services.
h2 Why Mobile Aircraft Oxygen Servicing Can Be Practical
Not every maintenance task needs to begin by repositioning the aircraft. Mobile servicing allows maintenance support to come to the aircraft when the required work can appropriately be performed on site. For owners, flight schools, charter operators, and other aviation businesses, this can simplify scheduling and reduce unnecessary aircraft movement.
It may be particularly useful when oxygen quantity needs attention before an upcoming operation or when an oxygen-system concern appears while the aircraft is already at its home airport.
Mobile service does not change the technical requirements of the job. The work still needs to follow applicable maintenance procedures and the requirements of the specific aircraft and system.
h2 Keep the Oxygen System Ready Before You Need It
Aircraft oxygen equipment is one of those systems you want ready before the flight profile makes it important. Proper servicing, regular checks, attention to pressure changes, and maintenance based on manufacturer requirements all contribute to dependable operation.
If your aircraft needs aircraft oxygen servicing in Stuart, FL, contact AirPro Mobile. We can discuss your aircraft, oxygen-system needs, location, and the appropriate next step for mobile service from our Stuart, Florida base.` },

  { slug: 'what-to-know-about-aircraft-engine-repair-in-florida', date: 'September 15, 2026', img: 'engine.jpg',
    title: 'What to Know About Aircraft Engine Repair in Florida',
    seoTitle: 'What to Know About Aircraft Engine Repair in Florida - AirPro Mobile',
    desc: 'Learn about aircraft engine repair in Florida, common warning signs, inspections, mobile maintenance, and AOG support. Contact AirPro Mobile today.',
    body: `An aircraft engine rarely goes from normal operation to a major problem without giving some indication that something has changed. Unusual vibration, abnormal sounds, fluid concerns, warning indications, or a noticeable change in performance all deserve attention.
For aircraft owners and operators, professional aircraft engine repair in Florida begins with proper diagnosis rather than replacing parts based on assumptions. At AirPro Mobile, we provide mobile aircraft maintenance and repair support, bringing service directly to aircraft owners, charter operators, flight schools, and aviation businesses.
h2 Common Signs an Aircraft Engine Needs Repair
Engine symptoms can have many causes, so a change in operation should be evaluated in the context of the specific aircraft and manufacturer guidance. Watch for changes such as:
li New or unusual engine noises
li Excessive or unfamiliar vibration
li Changes in power or performance
li Abnormal oil or fuel pressure indications
li Warning lights or engine-monitoring alerts
li Fuel, oil, or other fluid leaks
li Unexpected changes in operating temperatures
li Increased fuel or oil consumption
The FAA’s maintenance and certification material covers troubleshooting and inspection of systems involving oil pressure, fuel pressure, engine temperature, manifold pressure, and other powerplant indications. These are examples of why engine diagnosis requires technical evaluation rather than relying on one symptom alone.
If something feels, sounds, or reads differently from normal operation, documenting when it occurs can also give the mechanic useful information during troubleshooting.
h2 What Does Aircraft Engine Repair in Florida Include?
The exact work depends on the engine, aircraft, symptoms, and findings during inspection. Engine repair may begin with visual inspection and diagnostics before progressing to troubleshooting, component inspection, adjustment, repair, or replacement where required. A typical process may involve:
li Reviewing the reported problem and aircraft maintenance information
li Inspecting relevant engine systems and components
li Troubleshooting the source of the abnormal condition
li Determining the appropriate repair using applicable technical data
li Repairing, adjusting, or replacing components as required
li Testing the affected system after the work
li Completing applicable maintenance documentation
FAA regulations require aircraft maintenance to use methods, techniques, and practices prescribed by the current manufacturer’s maintenance manual or Instructions for Continued Airworthiness, or other methods acceptable to the FAA. That is an important distinction between professional aviation maintenance and simply finding a mechanical workaround.
h2 Why Professional Aircraft Engine Repair Matters
An aircraft engine operates as a system. A visible symptom may originate somewhere different from where it first appears.
For example, an abnormal indication may require investigation of the instrument, sensor, associated system, or engine component before the cause becomes clear. Proper troubleshooting helps avoid replacing a part that was never responsible for the problem.
Professional aircraft engine repair in Florida also supports proper maintenance records and return-to-service procedures. Federal regulations specify who may perform covered maintenance and who may approve aircraft, engines, and components for return to service after applicable work.
Early attention may also prevent an emerging defect from becoming a larger maintenance event or leaving the aircraft unavailable when it is needed.
h2 How to Choose an Aircraft Mechanic in Florida
When choosing maintenance support, focus on experience relevant to your aircraft and the work required. Useful questions include:
li Does the mechanic have the appropriate FAA certificate or authorization for the work?
li Do they have experience with the aircraft or engine category involved?
li Can they provide mobile or on-site support when appropriate?
li How do they handle troubleshooting before recommending repair?
li Do they follow current manufacturer and FAA maintenance requirements?
li How will the work and return-to-service documentation be handled?
li What response options are available for urgent or AOG situations?
FAA regulations place clear limits on who is authorized to perform maintenance and approve covered work for return to service, making credentials more than a marketing detail.
If you are searching for an Aircraft Mechanic in Florida, also consider how easily the mechanic can reach your aircraft. AirPro Mobile is based in Stuart, Florida, and provides mobile maintenance support rather than requiring every service need to begin with repositioning the aircraft.
h2 Benefits of Mobile Aircraft Engine Repair
Moving an aircraft solely to diagnose a maintenance problem is not always practical, particularly when the aircraft is grounded or the engine issue makes repositioning inappropriate.
Mobile support brings the mechanic to the aircraft when the required work can be performed on site. This may provide several practical advantages:
li Less need to reposition an aircraft for initial troubleshooting
li On-site assessment at the aircraft’s current location
li Easier support for unexpected maintenance events
li Greater convenience for owners and operators
li Less logistical disruption while determining the next step
Our mobile service model includes scheduled aircraft maintenance as well as urgent AOG support. Our AOG service specifically includes engine troubleshooting among the work we provide on location.
Not every engine repair can or should be completed in the field. The inspection findings and applicable maintenance requirements determine what can appropriately be handled on site.
h2 When Should You Schedule an Aircraft Engine Inspection?
Do not wait for a complete loss of performance before investigating a change.
An inspection may be appropriate when you notice abnormal operation, indications outside expected parameters, unusual vibration or sound, leaks, or recurring performance concerns. Routine scheduled maintenance also provides opportunities to examine engine condition before a problem becomes obvious during operation.
FAA inspection rules include engine performance checks involving power output, magnetos, fuel and oil pressure, and cylinder and oil temperature as applicable during annual and 100-hour inspections.
The aircraft’s maintenance program, operating history, manufacturer instructions, and the symptoms observed should guide the timing and scope of further inspection.
h2 Get the Engine Problem Properly Assessed
Engine maintenance is one area where the fastest guess is rarely the best answer. The useful starting point is to identify what changed, inspect the relevant systems, follow the applicable technical information, and repair the cause based on the findings.
At AirPro Mobile, we provide mobile [aircraft engine repair](/services/engine-repair/) in Florida along with troubleshooting, AOG maintenance, inspections, avionics support, oxygen servicing, and other aircraft services.
If your aircraft is showing unusual engine behavior or needs professional maintenance attention, contact our team to discuss the symptoms, aircraft details, and service requirements.` }
];

module.exports = { PHONE, TEL, EMAIL, HANGAR, services, aircraft, serviceList, reviews, homeFaq, servicePages, posts };

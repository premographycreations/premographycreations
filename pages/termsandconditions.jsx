import React, { useEffect } from "react";
import Navbar from "./nav.jsx";
import Footer from "./footer.jsx";
import WhatsAppButton from "./whatsappbutton.jsx";


const TermsAndConditions = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const sections = [
    {
      title: "1. Booking & Payment",
      subsections: [
        {
          heading: "Deposit Requirement",
          content: `A non-refundable deposit of 50% of the total photography package cost is required at the time of booking to confirm and secure the event date.
          
The booking is not considered confirmed until the deposit has been received and acknowledged in writing (via email or letter) by the photographer.`,
        },
        {
          heading: "Balance Payment",
          content: `The remaining 50% balance amount must be paid no later than 60 days prior to the event date, unless another payment schedule has been mutually agreed upon in writing (via email or letter).

Failure to make payment within the specified time may result in cancellation of the booking, and the deposit will be forfeited.`,
        },
        {
          heading: "Accepted Payment Methods",
          content: `Payments can be made through any of the following approved methods:

• Bank Transfer (NEFT / IMPS)
• UPI
• Cheque

All payments should be made in the photographer’s business owner's name as mentioned on the invoice.`,
        },
      ],
    },
    {
      title: "2. Cancellation & Rescheduling",
      subsections: [
        {
          heading: "Cancellation Procedure",
          content: `Any cancellation request must be submitted in writing (via email or letter) by the client.
          
Verbal cancellations are not accepted.`,
        },
        {
          heading: "Cancellation Charges",
          content: `• If cancelled 30 days or more before the event: deposit (50%) retained.  
• If cancelled within 15 days: 75% of total package charged.  
• If cancelled less than 7 days: full amount may be charged.`,
        },
        {
          heading: "Rescheduling",
          content: `Rescheduling is possible subject to the photographer’s availability on the new date. Additional administrative charges may apply, and rates may vary for different seasons or years.
          
The deposit will be carried forward to the new date if rescheduling is confirmed.`,
        },
      ],
    },
    {
      title: "3. Photographer’s Responsibilities",
      subsections: [
        {
          heading: "Attendance & Professional Conduct",
          content: `The photographer agrees to attend the event on the agreed date, time, and location as per booking confirmation, using professional equipment and their artistic style.`,
        },
        {
          heading: "Substitute Photographer",
          content: `If the primary photographer is unavailable due to illness, accident, or unforeseen circumstances, a qualified replacement will be arranged.

If none is available, the client will receive ₹5,000 per missed day as compensation.`,
        },
        {
          heading: "Equipment & Backup",
          content: `Professional equipment with backup gear will be used. In case of unavoidable technical failure, liability is limited as per Section 8 (Liability).`,
        },
      ],
    },
    {
      title: "4. Client Responsibilities",
      subsections: [
        {
          heading: "Accurate Information",
          content: `The client must provide complete and accurate event details — venue, schedule, timings, participants, etc. Any changes must be communicated at least 7 days prior.`,
        },
        {
          heading: "Permissions & Access",
          content: `The client must ensure necessary permissions for photography. The photographer is not liable for restrictions imposed by venue or authorities.`,
        },
        {
          heading: "Cooperation",
          content: `The client shall ensure guests cooperate with the photographer for smooth coverage.`,
        },
      ],
    },
    {
      title: "5. Image Delivery",
      subsections: [
        {
          heading: "Edited Images",
          content: `A curated selection of 50 edited photos will be delivered within 6–8 weeks after the event via online gallery, USB drive, or download link.`,
        },
        {
          heading: "Unedited (RAW) Files",
          content: `RAW files are not provided unless agreed upon in writing. Additional fee of ₹100 per GB applies.`,
        },
        {
          heading: "Delivery Timeline",
          content: `During peak seasons, timelines may extend slightly while ensuring quality.`,
        },
      ],
    },
    {
      title: "6. Image Rights & Usage",
      subsections: [
        {
          heading: "Copyright Ownership",
          content: `All photographs remain the intellectual property of the photographer.`,
        },
        {
          heading: "Client Usage Rights",
          content: `Clients receive a personal license for private, non-commercial use.`,
        },
        {
          heading: "Photographer’s Portfolio Rights",
          content: `The photographer may use selected images for portfolio or promotion unless the client opts out in writing before the event.`,
        },
      ],
    },
    {
      title: "7. Liability",
      subsections: [
        {
          heading: "Limited Liability",
          content: `The photographer’s total liability shall not exceed 25% of the total amount paid.`,
        },
        {
          heading: "Loss or Damage",
          content: `In case of digital file loss or damage, compensation will be proportionate to the affected portion.`,
        },
      ],
    },
    {
      title: "8. Force Majeure",
      subsections: [
        {
          content: `Neither party is liable for non-performance due to natural disasters, war, pandemics, or government restrictions. Both parties will make efforts to reschedule or settle fairly.`,
        },
      ],
    },
    {
      title: "9. Agreement",
      subsections: [
        {
          heading: "Acceptance of Terms",
          content: `By signing or paying the deposit, the client confirms acceptance of all terms and conditions.`,
        },
        {
          heading: "Entire Agreement",
          content: `This document supersedes all prior discussions and represents the entire agreement between both parties.`,
        },
      ],
    },
  ];

  return (
    <>
      <Navbar />
      <div className="terms-page">
        <div className="terms-header">
          <h1>Terms & Conditions</h1>
          <p>
            Please read the following carefully before confirming your booking
            with <strong>Premography Creations</strong>.
          </p>
        </div>

        <div className="terms-content">
          {sections.map((section, index) => (
            <div
              className="terms-section"
              key={index}
              data-aos="fade-up"
            >
              <h2>{section.title}</h2>
              {section.subsections.map((sub, i) => (
                <div className="subsection" key={i}>
                  {sub.heading && <h3>{sub.heading}</h3>}
                  <p>{sub.content}</p>
                </div>
              ))}
            </div>
          ))}
        </div>

        <div className="terms-footer">
          <p>With regards,</p>
          <h3>Premography Creations</h3>
          <p>Mobile: (+91) 8697019885</p>
        </div>
      </div>
      <Footer />
      <WhatsAppButton />
    </>
  );
};

export default TermsAndConditions;

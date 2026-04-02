// ComplaintsPage — displays the Complaints Handling Policy.
// Linked from the footer. Static content, no interactivity.
import { useScrollReveal } from '../hooks/useScrollReveal'
import './PrivacyPage.css' // reuses the same layout styles

export default function ComplaintsPage() {
  return (
    <>
      {/* Hero */}
      <section className="page-hero privacy-hero">
        <div className="container">
          <p className="page-hero__label">Legal</p>
          <h1 className="page-hero__headline">Complaints Handling Policy</h1>
          <p className="page-hero__sub">
            We are committed to resolving every concern fairly and promptly.
          </p>
        </div>
      </section>

      {/* Body */}
      <section className="privacy-body bg-green-dark section-padding">
        <div className="container privacy-body__inner">

          {/* Introduction */}
          <ComplaintsSection title="Introduction">
            <p>We (Loan Fair Pty Ltd T/As Name, Australian Credit Representative number xxxxxx) are committed to providing all our customers with excellent service. However, if you or any customer believes we have not adequately met our obligations, or you have a complaint about any of our services, we encourage you to let us know so we can resolve to your satisfaction.</p>
          </ComplaintsSection>

          {/* What is a complaint */}
          <ComplaintsSection title="What is a complaint?">
            <p>A complaint is defined in AS/NZS 10002:2014 and ratified by ASIC as "an expression of dissatisfaction made to or about an organisation, related to its products, services, staff, or the handling of a complaint, where a response or resolution is explicitly or implicitly expected or legally required."</p>
            <p>Any person who is dissatisfied with our service, for any reason, may contact us to complain. Sometimes we may receive negative feedback, which is not an actual complaint and as such may not require a resolution or formal follow up. Whilst we welcome feedback from all our customers, this policy does not apply to feedback of this nature.</p>
          </ComplaintsSection>

          {/* How to lodge */}
          <ComplaintsSection title="How to lodge a complaint">
            <p>If you have a complaint to make and you have not been able to resolve it to your satisfaction with the staff member involved, we encourage you to let our Complaints Officer know via any of the following contact points:</p>
            <ul>
              <li>In writing to — Business Address</li>
              <li>Via phone on xx xxxx xxxx</li>
              <li>Via email on xxx@xxx.com.au</li>
              <li>Via our website — www.xxxx.com.au</li>
            </ul>
            <p>When making a complaint, please provide the following information:</p>
            <ul>
              <li>Your name and contact details</li>
              <li>Details of the services we provided</li>
              <li>The nature of the complaint</li>
              <li>Details of the employee involved</li>
              <li>Copies of any documentation or correspondence supporting the complaint</li>
            </ul>
          </ComplaintsSection>

          {/* Extra assistance */}
          <ComplaintsSection title="Extra assistance">
            <p>Should any extra assistance be required to resolve this issue, including language interpretation, please let our Complaints Officer know. We will then attempt to rectify any such challenge.</p>
          </ComplaintsSection>

          {/* Internal resolution */}
          <ComplaintsSection title="Our internal resolution processes">
            <p>Upon receiving a complaint in writing, our Complaints Officer will attempt to contact the complainant within a maximum 24 hours, using the same medium that the complaint was received or in a manner requested by the complainant. This initial contact will be to at least acknowledge receipt of the complaint and our intent to investigate and resolve as soon as possible.</p>
            <p>Subsequently, our Complaints Officer will proactively and respectfully address the matter directly with the complainant with an intent to resolve within 5 business days. Sometimes this will not be possible, but in all circumstances, we will formally respond in writing within a regulatory maximum of 30 calendar days from when the complaint was first received.</p>
            <p>Within this 30 day period, and unless resolved to the complainant's satisfaction within 5 business days, our Complaints Officer will put in writing the following details to the complainant:</p>
            <ul>
              <li>Details of complaint received.</li>
              <li>Contact details of our Complaints Officer.</li>
              <li>Outcome of our internal complaint investigation, including steps and decisions taken.</li>
              <li>An explanation of our decision measured against the complaint made and investigation taken.</li>
              <li>The complainant's right to contact our External Dispute Resolution body (see details below) should they not be fully satisfied with the outcome of our internal process.</li>
            </ul>
          </ComplaintsSection>

          {/* External Dispute Resolution */}
          <ComplaintsSection title="External Dispute Resolution">
            <p>If an issue has not been resolved to your satisfaction, you can lodge a complaint with the Australian Financial Complaints Authority (AFCA). Our membership number is xxxxx. AFCA provides fair and independent financial services complaint resolution that is free to consumers.</p>
            <p>Details are as follows:</p>
            <ul>
              <li>Website via <a href="https://www.afca.org.au" target="_blank" rel="noopener noreferrer">www.afca.org.au</a></li>
              <li>Email via <a href="mailto:info@afca.org.au">info@afca.org.au</a></li>
              <li>Telephone via 1800 931 678 (free call)</li>
              <li>In writing to Australian Financial Complaints Authority, GPO Box 3, Melbourne VIC 3001</li>
            </ul>
          </ComplaintsSection>

        </div>
      </section>
    </>
  )
}

// Renders a single titled section with a scroll-reveal animation
function ComplaintsSection({ title, children }) {
  const ref = useScrollReveal()
  return (
    <div className="privacy-section reveal" ref={ref}>
      {title && <h2 className="privacy-section__title">{title}</h2>}
      <div className="privacy-section__body">{children}</div>
    </div>
  )
}

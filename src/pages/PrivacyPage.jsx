// PrivacyPage — displays the full consumer privacy policy.
// Linked from the footer. Static content, no interactivity.
import { useScrollReveal } from '../hooks/useScrollReveal'
import './PrivacyPage.css'

export default function PrivacyPage() {
  return (
    <>
      {/* Hero */}
      <section className="page-hero privacy-hero">
        <div className="container">
          <p className="page-hero__label">Legal</p>
          <h1 className="page-hero__headline">Privacy Policy</h1>
          <p className="page-hero__sub">
            Loan Fair Pty Ltd (ABN 82 696 091 924) — registered in Victoria, Australia.
          </p>
        </div>
      </section>

      {/* Body */}
      <section className="privacy-body bg-green-dark section-padding">
        <div className="container privacy-body__inner">

          {/* General */}
          <PrivacySection title="General">
            <p>References to "Loan Fair Pty Ltd", in this policy mean Loan Fair Pty Ltd (ACN 111 111 111) trading as www.website.com.au, along with all its subsidiaries, related entities, or controlled entities. The context will determine whether 'Loan Fair Pty Ltd' refers to one or multiple entities. Each Loan Fair Pty Ltd entity may perform different roles regarding your loan, such as acting as a broker or lender. This consent covers the roles of each entity. References to the singular ('I' or 'me') include the plural ('We' or 'us').</p>
            <p>This privacy policy outlines our compliance with the Privacy Act 1988 (Privacy Act). Terms 'personal information' and 'information' are used interchangeably, following the definition in section 6 of the Privacy Act.</p>
            <p>Loan Fair Pty Ltd collects personal information to provide requested products and services and information about other products and services offered by or through us. We protect your personal information in accordance with the Australian Privacy Principles (APP) under the Privacy Act, available at: <a href="https://www.oaic.gov.au/privacy" target="_blank" rel="noopener noreferrer">https://www.oaic.gov.au/privacy</a> and any applicable industry privacy code.</p>
          </PrivacySection>

          {/* Why We Collect Information */}
          <PrivacySection title="Why We Collect Information">
            <p>Loan Fair Pty Ltd collects information for purposes reasonably necessary for or directly related to our business functions or activities. These include:</p>
            <ul>
              <li>Providing products and services requested by customers, and monitoring, evaluating, and delivering products and services.</li>
              <li>Assisting with queries, resolving complaints, managing information access requests, or handling legal actions involving Loan Fair Pty Ltd.</li>
              <li>Managing customer relationships, accounts, and performing administrative tasks (e.g., risk management, system development, credit scoring, staff training, debt collection, and market research).</li>
              <li>Offering information about products and services from Loan Fair Pty Ltd, affiliated providers, and external providers we represent (unless the customer opts out).</li>
              <li>Complying with legal obligations, such as the National Consumer Credit Protection Act 2009, the Privacy Act, and the Anti-Money Laundering and Counter-Terrorism Financing Act 2006.</li>
              <li>Identifying customers or establishing tax status under Australian or foreign legislation, regulation, or treaties, or agreements with tax authorities.</li>
              <li>Gathering and aggregating information for statistical, prudential, actuarial, and research purposes.</li>
              <li>Developing and implementing measures to detect or prevent fraud and credit loss.</li>
              <li>Assisting with marketing and promotional purposes, including disclosing personal information to third parties, contractors, or organizations aiding our marketing and promotion efforts.</li>
            </ul>
            <p>Additionally, under Part IIIA of the Privacy Act, we may obtain your consent to collect, use, and disclose information about you. If you do not provide the required information, we may be unable to offer you the requested goods and services.</p>
          </PrivacySection>

          {/* What We Collect */}
          <PrivacySection title="What We Collect">
            <p>Loan Fair Pty Ltd collects personal information such as name, address, date of birth, gender, marital status, occupation, account details, contact details (telephone, facsimile, email), and financial information. We may also collect personal details for identification purposes over the telephone.</p>
            <p>For credit applications, we may collect information about your dependents, current address duration, employer's details, length of employment, proof of earnings, and previous employment details if applicable.</p>
          </PrivacySection>

          {/* Disclosure */}
          <PrivacySection title="Disclosure">
            <p>Loan Fair Pty Ltd will not disclose your information to government agencies, private sector organizations, or anyone else unless:</p>
            <ul>
              <li>You have consented.</li>
              <li>You would reasonably expect or have been informed that such information is usually disclosed.</li>
              <li>It is required or authorized by law.</li>
              <li>Your actions imply consent to the disclosure of information.</li>
              <li>It will prevent or lessen a serious and imminent threat to someone's life or health.</li>
              <li>It is reasonably necessary for law enforcement, protection of public revenue, or investigation of fraud, unlawful activity, or misconduct.</li>
            </ul>
            <p>Depending on the product or service, we may disclose information to:</p>
            <ul>
              <li>Affiliated and external product and service providers.</li>
              <li>Appointed auditors.</li>
              <li>Individuals acting on your behalf (e.g., financial adviser, solicitor).</li>
              <li>Your employer, referees, guarantors, or potential guarantors.</li>
              <li>Regulatory bodies, government agencies, or courts.</li>
              <li>Participants in the payment system and financial institutions.</li>
              <li>Insurers.</li>
              <li>Joint borrowers or account holders.</li>
              <li>Credit reporting bodies or debt collection agencies.</li>
              <li>Other financial institutions and organizations.</li>
              <li>Potential business or asset acquirers.</li>
              <li>Suppliers.</li>
              <li>Other specified organizations or individuals.</li>
            </ul>
          </PrivacySection>

          {/* Identity Verification and Credit Checks */}
          <PrivacySection title="Identity Verification and Credit Checks">
            <p>Loan Fair Pty Ltd is legally required to conduct identity verification and credit checks under legislation like the Anti-Money Laundering and Counter-Terrorism Financing Act 2006 and the National Consumer Credit Protection Act 2009. Information from online or in-store applications may be used to verify details and conduct credit checks, including e-verification. Consent for these checks will be sought during the application process. If there is a partial or no match, further documentation may be required for verification.</p>
            <p>We may also access and collect your financial records from your financial institutions via an online portal with your consent. This service removes the need for physical financial statements.</p>
            <p>If you fail to meet a payment obligation or commit a serious credit infringement, we may disclose this to a credit reporting body. You may request a credit reporting agency not to use your information for pre-screening direct marketing or if you believe you are a victim of fraud. You have the right to request a copy of your credit reporting information once a year or if it relates to our refusal of credit.</p>
            <p>We may disclose information to the following credit reporting bodies:</p>
            <ul>
              <li>Equifax Pty Ltd: <a href="http://www.equifax.com.au/privacy" target="_blank" rel="noopener noreferrer">www.equifax.com.au/privacy</a></li>
              <li>illion Australia Pty Ltd: <a href="https://www.illion.com.au/privacy-policy/" target="_blank" rel="noopener noreferrer">www.illion.com.au/privacy-policy</a></li>
              <li>Experian Asia Pacific Pty Ltd: <a href="http://www.experian.com.au/privacy-policy/" target="_blank" rel="noopener noreferrer">www.experian.com.au/privacy-policy</a></li>
            </ul>
          </PrivacySection>

          {/* Website Data */}
          <PrivacySection title="Website Data">
            <p>When visiting the Loan Fair Pty Ltd website, our system may record information provided by your browser, including:</p>
            <ul>
              <li>Date and time of visit.</li>
              <li>Browser type and operating system.</li>
              <li>Internet Service Provider and top-level domain name.</li>
              <li>Referring web address.</li>
              <li>IP address.</li>
            </ul>
            <p>Website data is kept confidential and used for internal research purposes only.</p>
          </PrivacySection>

          {/* Cookies */}
          <PrivacySection title="Cookies">
            <p>Our websites may send a "cookie" to your computer, providing a unique identification number. Cookies help us interact more effectively with your computer. They may be session cookies (lasting until you close your browser) or persistent cookies (stored longer term). Cookies do not identify individual users.</p>
            <p>You can configure your browser to accept, reject, or notify you of cookies. Rejecting all cookies may limit website functionality.</p>
          </PrivacySection>

          {/* Links to Other Websites */}
          <PrivacySection title="Links to Other Websites">
            <p>Our websites may link to non-Loan Fair Pty Ltd websites. We encourage you to read and understand the privacy policies of linked websites before providing information to them.</p>
          </PrivacySection>

          {/* Advertising & Performance Tracking */}
          <PrivacySection title="Advertising & Performance Tracking">
            <p>We use advertising companies to deliver online advertising. Cookies and Spotlight tags may collect information such as server details, browser type, visit date and time, and marketing performance. Anonymous information may also be collected about website usage for advertising effectiveness and consumer interest studies.</p>
          </PrivacySection>

          {/* Overseas Storage */}
          <PrivacySection title="Overseas Storage and Delivery of Information">
            <p>Loan Fair Pty Ltd may use third-party platforms for information delivery and storage at secure locations in Australia, Singapore, the United Kingdom, the United States, Ireland, or Hong Kong. These third-party providers use secure systems and processes equivalent to those required under the Australian Privacy Principles.</p>
          </PrivacySection>

          {/* Telephone */}
          <PrivacySection title="Telephone">
            <p>We may monitor and record telephone calls for training and security purposes.</p>
          </PrivacySection>

          {/* Email */}
          <PrivacySection title="Email">
            <p>We will preserve the content of any email that you send us if we are legally required to do so. Where appropriate, we may record your email address against the relevant company name on our confidential customer database. Your email address is used only to send you information that you have requested and as necessary to complete a transaction or application or for marketing purposes.</p>
            <p>As part of your use of our email marketing software, Loan Fair Pty Ltd allows you to elect to receive, or not to receive, certain information. Loan Fair Pty Ltd will not send you unsolicited email information related to marketing and promotional purposes where you have opted out of receiving such communication, offers or advertisements.</p>
            <p>Loan Fair Pty Ltd will not sell, rent or lend our contact lists or our customers' contact lists (including customer data) to third parties. All emails that you have requested will have an option to unsubscribe.</p>
          </PrivacySection>

          {/* Security */}
          <PrivacySection title="Security of Information">
            <p>Loan Fair Pty Ltd takes reasonable care to protect personal information collected or submitted, both physically and digitally. We regularly review security and encryption technologies. However, data transmission over the Internet cannot be guaranteed as totally secure. Upon receiving your transmission, we take steps to secure the information in our customer database.</p>
          </PrivacySection>

          {/* Contact Us */}
          <PrivacySection title="Contact Us">
            <p>For questions, further information, or to exercise your rights regarding our privacy practices and policies, please contact our Privacy Officer at:</p>
            <p>
              The Privacy Officer<br />
              Loan Fair Pty Ltd<br />
              Address, Suburb, State, Postcode<br />
              Phone: Number<br />
              Email: privacy@email.com.au
            </p>
            <p>Our Privacy Officer will address your concerns within a reasonable period and provide access to information in the manner requested, if practical.</p>
          </PrivacySection>

          {/* Acceptance and Changes */}
          <PrivacySection title="Acceptance and Changes to Privacy Policy">
            <p>Your use of the Loan Fair Pty Ltd website or products indicates acceptance of this Privacy Policy. This policy replaces any previous versions. Loan Fair Pty Ltd may vary the Privacy Policy by publishing changes on the Loan Fair Pty Ltd website, providing sufficient notice of the variation.</p>
          </PrivacySection>

        </div>
      </section>
    </>
  )
}

// Renders a single titled section with a scroll-reveal animation
function PrivacySection({ title, children }) {
  const ref = useScrollReveal()
  return (
    <div className="privacy-section reveal" ref={ref}>
      {title && <h2 className="privacy-section__title">{title}</h2>}
      <div className="privacy-section__body">{children}</div>
    </div>
  )
}

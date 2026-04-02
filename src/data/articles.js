// Learn hub article data.
// Each article: slug, title, category, date, excerpt, content (array of blocks), related (slugs).
// Block types: { type: 'p', text } | { type: 'h2', text } | { type: 'pullquote', text }

export const articles = [
  {
    slug: 'what-is-broker-margin',
    title: 'What is broker margin — and why does it matter to you?',
    category: 'Transparency',
    date: 'January 2025',
    excerpt: 'Most people have no idea their broker earns more money when their rate goes up. Here\'s how it works.',
    content: [
      {
        type: 'p',
        text: 'When you apply for a car loan through a broker, you\'d reasonably assume they\'re working to get you the best possible deal. In many cases, they are. But there\'s a widespread practice in the finance industry that creates a quiet conflict of interest — and most borrowers never find out about it.',
      },
      {
        type: 'h2',
        text: 'How brokers are typically paid',
      },
      {
        type: 'p',
        text: 'Most brokers receive two types of income from lenders. The first is an origination fee — a flat payment for introducing the loan. The second is a margin that some brokers add on top of the lender\'s base rate. If a lender offers a rate of 7%, the broker might charge you 8.5% and keep the difference. This extra income is called broker margin.',
      },
      {
        type: 'pullquote',
        text: 'If a broker earns more when your rate is higher, their incentive is to maximise your rate — not minimise it.',
      },
      {
        type: 'h2',
        text: 'Why it\'s a problem',
      },
      {
        type: 'p',
        text: 'The issue isn\'t that brokers earn income — they deserve to be paid. The issue is when that income grows with your rate. In that arrangement, a broker has a financial incentive to secure you a higher rate, not a lower one. You might never know this is happening because the margin is embedded in your rate, not itemised on your loan documents.',
      },
      {
        type: 'p',
        text: 'On a $30,000 loan over 5 years, a 1.5% rate margin could cost you around $1,200 extra in interest. That\'s money that flows to the broker while you think you\'re getting a competitive deal.',
      },
      {
        type: 'h2',
        text: 'What Loan Fair does differently',
      },
      {
        type: 'p',
        text: 'Loan Fair charges only a low flat brokerage fee. Fixed. Disclosed upfront. Our income doesn\'t change based on your interest rate. That means we have no financial incentive to push you toward a higher rate — and every reason to help you find the most competitive offer available.',
      },
      {
        type: 'p',
        text: 'We also disclose any commissions we receive from lenders. Nothing is buried.',
      },
    ],
    related: ['how-to-compare-car-loans', 'what-is-a-comparison-rate', '5-questions-before-signing'],
  },
  {
    slug: 'how-to-compare-car-loans',
    title: 'How to actually compare car loan offers',
    category: 'Practical Guide',
    date: 'January 2025',
    excerpt: 'Interest rates are just the start. Here\'s what to look at when two loan offers land in front of you.',
    content: [
      {
        type: 'p',
        text: 'You\'ve received two loan offers. One has a lower rate. Done, right? Not quite. Comparing car loans properly means looking beyond the headline number. Here\'s a practical walkthrough.',
      },
      {
        type: 'h2',
        text: '1. Use the comparison rate, not just the interest rate',
      },
      {
        type: 'p',
        text: 'The comparison rate rolls the interest rate and most fees into a single annual percentage, making it easier to compare the true cost of two loans. It\'s required by law on all consumer credit in Australia. If Loan A advertises 6.5% but has a high establishment fee, its comparison rate might be 7.2%. Loan B at 7% with no fees might compare at 7.1% — actually cheaper.',
      },
      {
        type: 'h2',
        text: '2. Check the loan term',
      },
      {
        type: 'p',
        text: 'A longer loan term means lower monthly repayments, but more interest paid overall. A 7-year loan on $25,000 at 7% will cost you significantly more than the same loan over 4 years. Make sure you\'re comparing loans with the same term, or run the total-cost numbers.',
      },
      {
        type: 'pullquote',
        text: 'Always ask: what is the total amount I\'ll repay over the life of this loan?',
      },
      {
        type: 'h2',
        text: '3. Understand all the fees',
      },
      {
        type: 'p',
        text: 'Establishment fees, monthly account fees, early repayment fees. These all affect the true cost. An early repayment fee (sometimes called a break cost) can be painful if you want to pay off your loan ahead of schedule.',
      },
      {
        type: 'h2',
        text: '4. Fixed vs variable',
      },
      {
        type: 'p',
        text: 'A fixed rate means your repayment stays the same for the life of the loan — predictable. A variable rate can move up or down with the market. For most car loans, fixed rates are standard. Ask before you assume.',
      },
      {
        type: 'h2',
        text: '5. Secured vs unsecured',
      },
      {
        type: 'p',
        text: 'A secured loan uses the vehicle as collateral — meaning the lender can repossess it if you default. Secured loans generally have lower rates. An unsecured personal loan has no collateral but more flexibility on what you spend the money on.',
      },
    ],
    related: ['what-is-a-comparison-rate', 'fixed-vs-variable', 'what-is-broker-margin'],
  },
  {
    slug: 'what-is-a-comparison-rate',
    title: 'What is a comparison rate?',
    category: 'Finance 101',
    date: 'January 2025',
    excerpt: 'The number lenders are required by law to show you — and why it exists.',
    content: [
      {
        type: 'p',
        text: 'You\'ve probably seen it in loan ads: a rate, then below it a smaller "comparison rate". Sometimes the comparison rate is notably higher. What\'s going on?',
      },
      {
        type: 'h2',
        text: 'Why comparison rates exist',
      },
      {
        type: 'p',
        text: 'Before comparison rates were introduced, lenders could advertise a very low interest rate and bury fees in the fine print. The comparison rate was created under the National Consumer Credit Protection Act to give borrowers a single, standardised number that includes both the interest rate and most fees and charges.',
      },
      {
        type: 'pullquote',
        text: 'Think of the comparison rate as the "all-in" cost of the loan, expressed as a single annual percentage.',
      },
      {
        type: 'h2',
        text: 'What\'s included',
      },
      {
        type: 'p',
        text: 'The comparison rate includes: the interest rate, establishment fee, monthly or annual account fees, and any other mandatory ongoing charges. It excludes: government charges, optional add-ons, and fees that only apply in specific circumstances (like early repayment).',
      },
      {
        type: 'h2',
        text: 'The standard loan used for calculations',
      },
      {
        type: 'p',
        text: 'In Australia, the comparison rate is calculated on a $30,000 secured loan over 5 years. This means comparison rates are most useful when comparing loans with similar amounts and terms. For a $15,000 loan over 3 years, the comparison rate gives you a directional indicator — but run the actual numbers for a precise comparison.',
      },
      {
        type: 'h2',
        text: 'What to do with this',
      },
      {
        type: 'p',
        text: 'When comparing loan offers, look at the comparison rate first. If two loans have similar comparison rates, dig into the details. If one comparison rate is much higher than the interest rate, it\'s a signal that fees are significant.',
      },
    ],
    related: ['how-to-compare-car-loans', 'fixed-vs-variable', '5-questions-before-signing'],
  },
  {
    slug: 'open-banking-explained',
    title: 'Open banking explained in plain English',
    category: 'Finance 101',
    date: 'February 2025',
    excerpt: 'Australia\'s Consumer Data Right lets you share your financial data securely. Here\'s what that means for your loan application.',
    content: [
      {
        type: 'p',
        text: 'Open banking is a system that gives you the right to share your own banking data with other financial institutions — securely and with your permission. It was introduced in Australia through the Consumer Data Right (CDR) legislation, starting with the big four banks in 2020 and rolling out more broadly since.',
      },
      {
        type: 'h2',
        text: 'Why it matters for loan applications',
      },
      {
        type: 'p',
        text: 'Traditionally, proving your income and expenses required collecting payslips, bank statements, and tax returns. Open banking allows you to share a digital read-only view of your bank account data directly with a lender, securely and instantly. No printing. No uploading. No waiting.',
      },
      {
        type: 'pullquote',
        text: 'Open banking doesn\'t give anyone the ability to move your money — it\'s read-only, and you control exactly what\'s shared.',
      },
      {
        type: 'h2',
        text: 'How it works in practice',
      },
      {
        type: 'p',
        text: 'When you apply for a loan, a lender might offer you the option to connect your bank account via CDR. You log in to your bank, authorise the data share, and the lender receives a structured view of your income and spending. This can speed up assessment significantly — sometimes from days to minutes.',
      },
      {
        type: 'h2',
        text: 'Is it safe?',
      },
      {
        type: 'p',
        text: 'Yes. CDR is regulated by the Australian Competition and Consumer Commission (ACCC). Accredited data recipients must meet strict security standards. You can revoke access at any time. Your bank credentials are never shared — the authorisation happens directly with your bank.',
      },
      {
        type: 'h2',
        text: 'Do I have to use it?',
      },
      {
        type: 'p',
        text: 'No. Open banking is opt-in. You can still provide traditional documents if you prefer. But for borrowers comfortable with the technology, it can meaningfully accelerate the application process.',
      },
    ],
    related: ['how-to-compare-car-loans', 'what-is-broker-margin', '5-questions-before-signing'],
  },
  {
    slug: 'fixed-vs-variable',
    title: 'Fixed vs variable rate loans: what\'s the difference?',
    category: 'Finance 101',
    date: 'February 2025',
    excerpt: 'One stays the same. One can move. Here\'s how to think about which is right for your situation.',
    content: [
      {
        type: 'p',
        text: 'When you take out a loan, the lender will offer you a fixed or variable interest rate — sometimes both. Here\'s what each means, and how to think about choosing between them.',
      },
      {
        type: 'h2',
        text: 'Fixed rate loans',
      },
      {
        type: 'p',
        text: 'A fixed rate stays the same for the entire loan term. Your repayment amount doesn\'t change — regardless of what happens to interest rates in the economy. This makes budgeting simple. You know exactly what you\'ll pay each month from day one.',
      },
      {
        type: 'pullquote',
        text: 'Fixed rate: predictable. Variable rate: flexible. Both have trade-offs.',
      },
      {
        type: 'h2',
        text: 'Variable rate loans',
      },
      {
        type: 'p',
        text: 'A variable rate can move up or down over time, typically in response to changes in the Reserve Bank of Australia\'s official cash rate. If rates fall, your repayments could drop. If rates rise, they increase. Variable rate loans often have fewer restrictions — many allow extra repayments and early payoff without penalty.',
      },
      {
        type: 'h2',
        text: 'For car loans specifically',
      },
      {
        type: 'p',
        text: 'Most car and personal loans in Australia are offered at fixed rates. This is partly because the loan terms are shorter (3–7 years) and lenders prefer certainty. Variable car loans do exist but are less common. If you\'re comparing offers, check whether rates are fixed or variable — this affects the comparison rate calculation.',
      },
      {
        type: 'h2',
        text: 'Which is better?',
      },
      {
        type: 'p',
        text: 'There\'s no universally right answer. If you value certainty and a structured budget, fixed is simpler. If you think rates are likely to fall, or you plan to make extra repayments, variable gives you more flexibility. For most car loan borrowers, fixed rates are the standard and provide a predictable, manageable structure.',
      },
    ],
    related: ['what-is-a-comparison-rate', 'how-to-compare-car-loans', '5-questions-before-signing'],
  },
  {
    slug: '5-questions-before-signing',
    title: '5 questions to ask before signing any loan',
    category: 'Practical Guide',
    date: 'February 2025',
    excerpt: 'Before you put pen to paper, make sure you can answer these five questions.',
    content: [
      {
        type: 'p',
        text: 'Signing a loan is a significant commitment. Once you\'re in, you\'re in — often for 3 to 7 years. Before you sign anything, these five questions will help you confirm you\'re getting a fair deal.',
      },
      {
        type: 'h2',
        text: '1. What is the total amount I will repay?',
      },
      {
        type: 'p',
        text: 'Not the interest rate. Not the monthly repayment. The total amount. Add up every payment over the full loan term. This number — not the headline rate — is what you\'re actually paying. Ask your broker or lender to confirm it in writing before you proceed.',
      },
      {
        type: 'h2',
        text: '2. What fees are included — and are any hidden?',
      },
      {
        type: 'p',
        text: 'Ask for an itemised breakdown: establishment fee, monthly fees, any exit or early repayment fees. Under Australian law, all fees must be disclosed. If anything is unclear, ask for plain-language clarification.',
      },
      {
        type: 'h2',
        text: '3. How is my broker or advisor being paid?',
      },
      {
        type: 'p',
        text: 'This is one most people don\'t ask — and most brokers won\'t volunteer. Ask directly: "Do you earn income based on my interest rate?" If the answer is yes, or vague, understand that your rate may be higher than it needs to be.',
      },
      {
        type: 'pullquote',
        text: 'Ask your broker directly: "How are you paid, and does your income change based on my interest rate?"',
      },
      {
        type: 'h2',
        text: '4. Can I make extra repayments or pay it off early?',
      },
      {
        type: 'p',
        text: 'If your financial situation improves, you might want to pay off your loan faster. Some loans charge early repayment fees — sometimes significant. Check whether this applies before you commit.',
      },
      {
        type: 'h2',
        text: '5. What happens if I miss a payment?',
      },
      {
        type: 'p',
        text: 'Life is unpredictable. Ask what the lender\'s process is if you miss a payment. Are there hardship provisions? What are the default fees? Knowing this upfront won\'t make it happen — but it\'s better to know the rules before you need them.',
      },
    ],
    related: ['what-is-broker-margin', 'how-to-compare-car-loans', 'what-is-a-comparison-rate'],
  },
  {
    slug: 'what-is-a-balloon-payment',
    title: 'What is a balloon payment — and is it right for you?',
    category: 'Finance 101',
    date: 'March 2025',
    excerpt: 'A balloon payment can lower your monthly repayments — but there\'s a catch at the end of the loan. Here\'s what you need to know.',
    content: [
      {
        type: 'p',
        text: 'When you\'re comparing car loans, you might come across the option to add a "balloon payment". The name sounds oddly cheerful for something that can catch borrowers off guard. Here\'s a plain-English breakdown.',
      },
      {
        type: 'h2',
        text: 'What is a balloon payment?',
      },
      {
        type: 'p',
        text: 'A balloon payment is a lump sum you agree to pay at the end of your loan term, rather than spreading it across your regular repayments. For example, on a $30,000 loan over 5 years, you might set a $8,000 balloon. Your monthly repayments are calculated on $22,000 — so they\'re lower — but at the end of year five, you owe that final $8,000 in one hit.',
      },
      {
        type: 'pullquote',
        text: 'A balloon payment defers cost — it doesn\'t reduce it. You\'re still paying the full loan amount, plus interest on the balloon portion the entire time.',
      },
      {
        type: 'h2',
        text: 'Why do people use them?',
      },
      {
        type: 'p',
        text: 'The main appeal is cash flow. If your income is variable, or you want to keep monthly commitments lower right now, a balloon can help. Some borrowers also use them when they expect to sell the vehicle before the loan ends — the sale proceeds cover the balloon and they walk away clean.',
      },
      {
        type: 'h2',
        text: 'The real cost',
      },
      {
        type: 'p',
        text: 'Because you\'re still being charged interest on the balloon balance throughout the loan, a balloon payment typically means you pay more total interest than a standard loan. On a $30,000 loan at 8%, adding a $6,000 balloon over 5 years could cost you an extra $1,000–$1,500 in interest over the life of the loan.',
      },
      {
        type: 'h2',
        text: 'What happens at the end?',
      },
      {
        type: 'p',
        text: 'When the balloon comes due, you have a few options: pay it in full from savings, refinance the remaining amount into a new loan, or — if you\'re using the vehicle for business — many people factor this into their cash flow planning. The risk is being unprepared. If you can\'t pay and can\'t refinance, you may need to sell the vehicle urgently.',
      },
      {
        type: 'h2',
        text: 'Is it right for you?',
      },
      {
        type: 'p',
        text: 'A balloon suits borrowers who genuinely have a plan for the end-of-term payment. It\'s less suitable if you\'re simply trying to make the loan "affordable" month-to-month without a strategy for the lump sum. Always ask your broker to show you both options — with and without a balloon — and compare the total repayment across each.',
      },
    ],
    related: ['how-to-compare-car-loans', 'new-vs-used-car-finance', '5-questions-before-signing'],
  },
  {
    slug: 'credit-score-and-your-loan-rate',
    title: 'How your credit score affects your car loan rate',
    category: 'Finance 101',
    date: 'March 2025',
    excerpt: 'Lenders use your credit score to decide how much risk you represent. That directly affects the rate they\'ll offer you.',
    content: [
      {
        type: 'p',
        text: 'Your credit score is one of the first things a lender looks at when you apply for a car loan. It\'s a number that represents your creditworthiness — how reliably you\'ve managed debt in the past. And it has a direct impact on the interest rate you\'ll be offered.',
      },
      {
        type: 'h2',
        text: 'What is a credit score?',
      },
      {
        type: 'p',
        text: 'In Australia, credit scores are managed by credit reporting bureaus including Equifax, Experian, and illion. Each uses slightly different scoring ranges, but broadly: a higher score means lower risk. Your score is based on your repayment history, the types of credit you hold, how long your credit history is, and how many credit applications you\'ve made recently.',
      },
      {
        type: 'pullquote',
        text: 'A good credit score doesn\'t just get you approved — it can save you thousands in interest over the life of a loan.',
      },
      {
        type: 'h2',
        text: 'How lenders use your score',
      },
      {
        type: 'p',
        text: 'Lenders use credit scores to assign applicants to risk tiers. Borrowers in higher tiers (better credit) are offered lower rates — because statistically they\'re less likely to default. Borrowers with lower scores may be approved, but at a higher rate that compensates the lender for the increased risk. Some lenders won\'t approve applicants below certain thresholds at all.',
      },
      {
        type: 'h2',
        text: 'The practical impact',
      },
      {
        type: 'p',
        text: 'The rate difference between a strong credit profile and a weak one can be substantial — sometimes 3–5% per year on consumer car loans. On a $25,000 loan over 5 years, a 3% rate difference adds up to roughly $2,000 in extra interest. Your credit score is, quite literally, worth money.',
      },
      {
        type: 'h2',
        text: 'How to check your score',
      },
      {
        type: 'p',
        text: 'You can access your credit report for free once a year from each bureau. Services like Credit Savvy (Experian) and ClearScore (Equifax) offer free ongoing access. Checking your own score does not affect it — only hard enquiries from lenders do.',
      },
      {
        type: 'h2',
        text: 'What improves your score over time',
      },
      {
        type: 'p',
        text: 'Paying bills on time, reducing outstanding debt, avoiding multiple loan applications in a short period, and keeping credit card balances low all contribute positively. Negative marks — like defaults or late payments — typically take years to age off your file, but their impact fades over time. If your score isn\'t where you\'d like it, it\'s rarely permanent.',
      },
    ],
    related: ['how-to-compare-car-loans', 'what-is-broker-margin', '5-questions-before-signing'],
  },
  {
    slug: 'new-vs-used-car-finance',
    title: 'New vs used car finance: what actually changes?',
    category: 'Practical Guide',
    date: 'March 2025',
    excerpt: 'Financing a new car and a used car aren\'t the same process. Here\'s what\'s different — and what it means for your rate.',
    content: [
      {
        type: 'p',
        text: 'Most people know that new cars cost more than used ones. But fewer realise that the type of vehicle you buy also affects how lenders assess your loan — and the rate you\'ll pay. Here\'s what changes between new and used car finance.',
      },
      {
        type: 'h2',
        text: 'Rates are often lower on new vehicles',
      },
      {
        type: 'p',
        text: 'Lenders view new cars as lower-risk collateral. The value is known, the condition is certain, and there\'s no question about hidden mechanical history. As a result, many lenders offer lower interest rates on new car loans than on used ones — sometimes 1–2% lower for comparable borrowers. If you\'re deciding between new and used, factor this into your total cost comparison.',
      },
      {
        type: 'pullquote',
        text: 'A lower purchase price on a used car can be offset by a higher interest rate. Always compare the total cost of ownership, not just the sticker price.',
      },
      {
        type: 'h2',
        text: 'Age and kilometre limits on used vehicles',
      },
      {
        type: 'p',
        text: 'Most lenders have restrictions on the age and kilometres of vehicles they\'ll finance. A common limit is that the vehicle must be no older than 12 years at the end of the loan term. On a 5-year loan, that means the vehicle can be no older than 7 years at purchase. High-kilometre vehicles (typically over 150,000–200,000km) may be declined by some lenders entirely, or attract higher rates.',
      },
      {
        type: 'h2',
        text: 'Private sale vs dealer purchase',
      },
      {
        type: 'p',
        text: 'Buying privately versus through a dealer also affects your loan. Dealer purchases are generally simpler — the dealer handles transfer paperwork and the lender can verify the vehicle easily. Private sale purchases require more documentation, and some lenders won\'t lend on private sales at all. If you\'re buying privately, confirm your lender will approve this before you negotiate a price.',
      },
      {
        type: 'h2',
        text: 'Loan-to-value ratio matters more on used cars',
      },
      {
        type: 'p',
        text: 'Lenders assess the loan-to-value ratio (LVR) — how much you\'re borrowing relative to the vehicle\'s value. On a new car with a dealer invoice, this is straightforward. On a used car, lenders use industry valuation guides (like Glass\'s or RedBook) to determine the vehicle\'s market value. If you\'re paying above market rate for a used car, some lenders may not lend the full amount — leaving a gap you\'ll need to cover.',
      },
      {
        type: 'h2',
        text: 'The bottom line',
      },
      {
        type: 'p',
        text: 'New car finance is typically simpler and cheaper. Used car finance requires more due diligence on the vehicle itself — age, kilometres, valuation, and purchase type all come into play. The right choice depends on your budget, the specific vehicle, and the lender your broker recommends for your situation.',
      },
    ],
    related: ['what-is-a-balloon-payment', 'how-to-compare-car-loans', 'credit-score-and-your-loan-rate'],
  },
]

// Helper to find an article by slug
export function getArticle(slug) {
  return articles.find((a) => a.slug === slug) || null
}

// Helper to get articles by slugs (for related section)
export function getRelatedArticles(slugs) {
  return slugs.map((s) => articles.find((a) => a.slug === s)).filter(Boolean)
}

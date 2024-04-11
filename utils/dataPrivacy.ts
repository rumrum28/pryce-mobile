interface NestedListItem {
  one?: string
  two?: string
  three?: string
  four?: string
  five?: string
  six?: string
  seven?: string
}

interface DataPrivacyProps {
  title: string
  description: string
  list?: NestedListItem[]
  descriptionTwo?: string
  descriptionThree?: string
}

export const dataPrivacy: DataPrivacyProps[] = [
  {
    title: "PRYCE GASES, INC. DATA PRIVACY POLICY",
    description:
      "This Privacy Policy describes the principles and safeguards the Company observes as a personal data controller as it pursues the following:",
    list: [
      {
        one: "1. Collection of personal data from data subject on the website;",
        two: "2. Usage and protection of such personal data;",
        three:
          "3. Processing of such personal data, data sharing and outsourcing;",
        four: "4. Protection of the rights of the data subject with respect to the personal data provided on this website; and",
        five: "5. For purposes of direct marketing and profiling.",
      },
    ],
    descriptionTwo:
      "This Privacy Policy does not apply to any other information collected by the Company by or through any other means, such as information collected offline, unless otherwise provided or indicated by the Company.",
    descriptionThree:
      "Our website may contain links to third party websites or services that are not owned or controlled by the Company. Consequently, the Company is not responsible for how these websites treat your personal data.",
  },
  {
    title: "THE DATA WE COLLECT AND USE",
    description:
      "We collect personal data you choose to provide through registrations, applications, enrollments, and surveys, and in connection with your inquiries and purchases of the Company’s products.",
    descriptionTwo:
      "Personal data may either be personal information or sensitive personal information, as defined under the “Data Privacy Act of 2012” (the “DPA”) and its Implementing Rules and Regulations. By electing to provide your name, address, contact information, and other personal data, you hereby consent to the processing of your personal data within the extent provided for in this Privacy Policy. By agreeing to this Privacy Policy, you understand and acknowledge that the information disclosed herein, including personal data, are collected, processed and stored in the Company’s data base system and/or in the data base system of its affiliates or authorized third parties, which shall be used and administered solely by the Company and its said affiliate companies and authorized third parties in connection with the implementation and enhancements of the Company’s various activities and programs.",
    descriptionThree:
      "In case you submit any personal data of any person other than yourself, this shall be treated as a representation that you have the authority to do so and to permit us to use the information in accordance with this Privacy Policy.",
  },
  {
    title: "HOW WE USE PERSONAL DATA",
    description:
      "We may use your personal data in the following ways and for the following purposes:",
    list: [
      {
        one: "1. Operate our business by delivering our products and services;",
        two: "2. Process, complete and fulfill the billing statement, invoice, payment and other requested transactions;",
        three:
          "3. Provide customer service and respond and communicate to requests or inquiries;",
        four: "4. Tailor our marketing programs and campaigns;",
        five: "5. Provide you with newsletters, articles, alerts, announcements, invitations, and other information about products, brands, etc.;",
        six: "6. Improve and develop our products and services; and",
        seven:
          "7. Comply with regulatory monitoring and reporting obligations as may be required by law; and",
      },
    ],
    descriptionTwo:
      "Your agreement to this Privacy Policy shall constitute an express consent to the processing, sharing and storage of your personal information.",
  },
  {
    title: "HOW WE SHARE YOUR PERSONAL DATA",
    description: "The Company may share your personal data as follows:",
    list: [
      {
        one: "1. By filling out online forms and providing personal data, you hereby agree to the collection, processing, and sharing of your personal data amongst and between the Company its parent company, and subsidiary companies for the purposes set forth in this Privacy Policy. Data sharing refers to the disclosure or transfer of personal data to third parties, other than those classified as personal information processors.",
        two: "2. If we sell or transfer a business unit (such as a subsidiary) or an asset (such as a website) to another company, we will share your personal data with such company exclusively in connection with implementation of, and availment of your rights in, the contract and will require such company to use and protect the same consistent with this Privacy Policy.",
        three:
          "3. We may outsource the processing of personal data collected by retaining other companies and individuals to perform services on our behalf and we may collaborate with other companies and individuals with respect to particular products or services (collectively, “Personal Information Processors”). These third parties may be provided with access to personal data needed to perform their functions, but they may not use such data other than on our behalf or subject to contracts that protect the confidentiality of the data and are enjoined to comply with the requirements of this Privacy Policy, the DPA and its Implementing Rules and Regulations.",
      },
    ],
    descriptionTwo:
      "We reserve the right to disclose your personal data as required by law, when we believe disclosure is necessary or appropriate to comply with a regulatory requirement, judicial proceeding, court order, government request, or legal process served on us, or to protect the safety, rights, or property of our customers, the public, and the Company.",
  },
  {
    title: "RIGHTS OF A DATA SUBJECT",
    description:
      "You have the following rights pertaining to any of your personal, sensitive, and privileged information you provide on our website:",
    list: [
      {
        one: "1. Withdraw your consent to the continued use, disclosure, and/or processing of your personal data;",
        two: "2. Request erasure or blocking of your personal data;",
        three:
          "3. Request correction of inaccurate or erroneous personal data;",
        four: "4. Request for reasonable access to your personal data;",
        five: "5. Lodge a complaint before the National Privacy Commission under Section 16 of the Data Privacy Act; and",
        six: "6. Request for indemnification for damages sustained due to such inaccurate, incomplete, outdated, false, unlawfully obtained, or authorized use of personal data. This request shall be subject to Company policy and applicable laws.",
      },
    ],
    descriptionTwo:
      "If you would like to access, review, correct, and update the provided personal data, or obtain a copy of your data undergoing processing, you may contact us as indicated in the Contact Us page of our website. Please note that we may need to keep and retain certain personal data for recordkeeping purposes",
    descriptionThree:
      "and/or to complete any transactions that you began prior to requesting a change or deletion. However, you cannot invoke the foregoing rights when the processed personal information are used only for the needs of scientific or statistical research while observing legal parameters for such use.",
  },
  {
    title: "RETENTION PERIOD",
    description:
      "We will retain your personal data within the Company’s applicable retention schedules for as long as needed or permitted in light of the purpose(s) for which it was obtained and as outlined in this Privacy Policy.",
    list: [
      {
        one: "1. Personal data collected will be retained using the following criteria: for as long as necessary for the fulfillment of the purposes for which the data was obtained;",
        two: "2. For the establishment, pursuance, and defense of legal claims; or",
        three:
          "3. For any legitimate business purposes, or as provided by law.",
      },
    ],
  },
  {
    title: "NOTIFICATION IN CASE OF DATA BREACH",
    description:
      "In case of claims involving privacy breach, personal data misuse, or any issue concerning alleged violation of your data privacy rights, the Company shall be notified within seventy-two (72) hours upon knowledge thereof, detailing the nature of the breach, negative consequences or harm caused, and the assistance or relief sought.",
  },
  {
    title: "UPDATES TO OUR PRIVACY POLICY",
    description:
      "From time to time, this Privacy Policy may be updated, but any changes hereto will only be effective upon posting the revised Privacy Policy. If the Privacy Policy changes in a way that significantly affects how we handle personal data, we will not use the personal data we previously gathered in the manner described in the new policy without providing notice and/or obtaining your consent, as appropriate.",
    descriptionTwo:
      "Minor changes to the policy may occur that will not significantly affect our use of personal data without notice or consent. We encourage you to periodically review this page for the latest information on our privacy practices.",
  },
]

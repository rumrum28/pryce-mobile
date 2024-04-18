export interface FaqsProps {
  question: string
  answer: DeliveryProps[]
}

export interface DeliveryProps {
  zero: string
  one: string
}

export const deliveryQuestions: FaqsProps[] = [
  {
    question: "Paano kami makaka-order ng PRYCEGAS LPG?",
    answer: [
      {
        zero: " ",
        one: "Gusto ng PRYCEGAS na mapadali ang buhay niyo, kaya’t marami kaming inihahandog na paraan para kayo ay maka-order:",
      },
      {
        zero: "1",
        one: "Una, maaari kayong tumawag sa #98000 (toll-free) at isa sa aming mga agents ang gagabay sa inyong pagbili.",
      },
      {
        zero: "2",
        one: "Pangalawa, maaari din kayong bumisita sa aming website (www.prycegas.com) and sundin lamang ang mga panuto na nakasulat para maka-order.",
      },
      {
        zero: "3",
        one: "Pangatlo, sadyain ang aming official Facebook page (www.facebook.com/prycegasofficial) at mag-mensahe lamang ng inyong order.",
      },
    ],
  },
  {
    question: "Gaano kalawak ang sakop ng inyong Home Delivery services?",
    answer: [
      {
        zero: " ",
        one: "Ang PRYCEGAS ay matatagpuan sa bawat sulok ng Pilipinas, mula Luzon, Visayas, hanggang Mindanao. Maari kaming makapag-deliver sa mga pangunahing siyudad at bayan, mula sa aming 600+ Sales Center at 80+ Refilling Plants/Terminals sa buong bansa.",
      },
      {
        zero: " ",
        one: "Maari din kayong sumangguni sa aming website (www.prycegas.com), bisitahin ang aming official Facebook page (www.facebook.com/prycegasofficial), o tumawag sa aming Hotline (#98000) para sa karagdagang impormasyon.",
      },
    ],
  },
  {
    question: "Hanggang anong oras ang inyong Home Delivery?",
    answer: [
      {
        zero: " ",
        one: "Tumatanggap kami ng orders mula 6:00 AM hanggang 8:00 PM at nagde-deliver kami hanggang 9:00 PM.",
      },
      {
        zero: " ",
        one: "Para naman sa mga miyembro ng PRYCEGAS Club, ang Home Delivery services ay bente-kwatro oras, araw-araw (24/7).",
      },
    ],
  },
  {
    question: "Ano-anong mga produkto na pwedeng ipa-deliver?",
    answer: [
      {
        zero: " ",
        one: "Sa inyong pag-tawag, maaari kayong: Makapagpa-refill ng inyong mga pagmamay-aring tanke (POWERKALAN, 11kg, 22kg o 50kg) ",
      },
    ],
  },
  {
    question: "Gaano katagal ang pag-deliver ng aming order?",
    answer: [
      {
        zero: " ",
        one: "Sa loob ng isang oras, sisiguraduhin ng PRYCEGAS na maipadala ang inyong order.",
      },
    ],
  },

  {
    question: "Saan ko pwedeng malaman ang status ng aking delivery?",
    answer: [
      {
        zero: " ",
        one: "Depende ito sa paraan ng inyong pag-order:",
      },
      {
        zero: "1",
        one: "Para sa mga tumawag sa aming Hotline (#98000), maaari din kayong tumawag ulit at isa sa aming mga agent ang makakapagsabi ng estado ng inyong delivery.",
      },
      {
        zero: "2",
        one: "Para sa mga nag-order mula sa aming website (www.prycegas.com), kapag na-kumpira na ang inyong mga bayad, kusang lalabas ang ‘delivery status’ sa inyong mga screen, para mabantayan nyo kung nasaan na ang mga produkto.",
      },
      {
        zero: "3",
        one: "Para sa mga nag-order mula sa aming official Facebook page (www.facebook.com/prycegasofficial), maaari din kayong magpadala ng karagdagang mensahe at isa sa aming mga agents ang sasagot ng inyong katanungan.",
      },
    ],
  },
  {
    question: "Meron bang ‘minimum order value’ ang pagpapa-deliver?",
    answer: [
      {
        zero: " ",
        one: "Wala. Ang PRYCEGAS ay magde-deliver sa inyo - maliit man or malaki ang inyong order.",
      },
    ],
  },
  {
    question:
      "Pwede ba kaming magbigay ng ‘special instructions’ kung saan o kalian maaaring i-deliver ang aming order?",
    answer: [
      {
        zero: " ",
        one: "Pwedeng-pwede! Basta tama ang proseso ng inyong pag-order at naipaliwanag sa aming mga clerks, ang PRYCEGAS na ang bahala sa inyong order.",
      },
    ],
  },
  {
    question:
      "Pwede ba ang pag-order ng magkaka-ibang timbang ng LPG nang sabay-sabay?",
    answer: [
      {
        zero: " ",
        one: "Pwedeng-pwede! Basta tama ang proseso ng inyong pag-order, makakarating sa inyo ng ligtas ang mga produktong kailangan nyo, kahit iba-iba pa ito ng timbang.",
      },
    ],
  },
  {
    question: "Maari ba akong umorder para sa ibang tao?",
    answer: [
      {
        zero: " ",
        one: "Tinatanggap ng PRYCEGAS ang pag-order para sa ibang tao basta maibibigay nyo lang ang complete name, exact delivery address, at contact details ng taong papadalhan ng produkto. At syempre, wag din kalimutan na magbayad ng tama. Ang aming mga clerks na ang bahalang tumawag para masiguro na matatanggap nila ang produkto.",
      },
    ],
  },
  {
    question: "Paano kung gusto naming baguhin ang aming order?",
    answer: [
      {
        zero: " ",
        one: "Para sa mga nag-order gamit ang Hotline (#98000), maaaring tumawag lang muli at ibigay ang inyong Order Number para matulungan kayo ng aming mga agent na makapagpalit ng order.",
      },
      {
        zero: " ",
        one: "Para sa mga nag-order gamit ang website (www.prycegas.com), hindi na maaaring baguhin ang inyong order kung na-confirm mo na ito. Siguraduhin na tama ang lahat ng detalye ng inyong order bago mag-check out sa aming website.",
      },
    ],
  },
]

export const websiteQuestions: FaqsProps[] = [
  {
    question:
      "Paano kami makakagawa ng aming online account sa PRYCEGAS website?",
    answer: [
      {
        zero: " ",
        one: "Magtungo lamang sa aming website (www.prycegas.com) at hanapin ang sign-up button na matatagpuan sa kanang itaas na bahagi ng inyong screen.",
      },
      {
        zero: " ",
        one: "Punan lamang ng mga kailangang detalye at pindutin ang confirm.",
      },
    ],
  },
  {
    question: "Para saan ang paggawa ng online account?",
    answer: [
      {
        zero: " ",
        one: "Ang inyong online account ang gagamiting basehan ng PRYCEGAS sa pagproseso ng inyong mga order. Dito nakasaad ang inyong pangalan, address na padadalhan ng produkto, mobile number at ilang importante impormasyon na makakatulong mapadali ang inyong pag-order sa susunod.",
      },
      {
        zero: " ",
        one: "Sa online account din pwedeng ilagay ang mga payment method na angkop sa inyo. Maaari na kayong makapagbayad sa PRYCEGAS gamit ang inyong credit/debit cards, GCash, GRABPay, at MAYA bukod sa pagbabayad ng cash.",
      },
      {
        zero: " ",
        one: "Dito nyo din pwedeng makita ang delivery status ng inyong mga order.",
      },
    ],
  },
]

export const paymentMethodQuestions = [
  {
    question: "Ano-anong mode of payments ang tinatanggap ng PRYCEGAS?",
    answer: [
      {
        zero: " ",
        one: "Cash-on-Delivery (COD) at GCash QR payments ang tinatanggap para sa mga nag-order mula sa aming Hotline (#98000) at sa official Facebook page (www.facebook.com/prycegasofficial). ",
      },
      {
        zero: " ",
        one: "Cash-on-Delivery (COD), Credit/Debit card, GCash, GrabPay, at MAYA online payments naman para sa mga nag-order mula sa aming website (www.prycegas.com).",
      },
    ],
  },
  {
    question: "Meron bang delivery charge ang PRYCEGAS?",
    answer: [
      {
        zero: " ",
        one: "Hindi naniningil ng kahit anong delivery charge ang PRYCEGAS.",
      },
    ],
  },
  {
    question: "Nagdadala ba ng sukli ang mga delivery riders ng PRYCEGAS?",
    answer: [
      {
        zero: " ",
        one: "Wag mag-alala. Laging may dalang sukli ang aming mga delivery rides para sa inyong mga orders.",
      },
      {
        zero: " ",
        one: "Kung ikaw naman ay nag-order mula sa aming website (www.prycegas.com) at Cash-on-Delivery (COD) ang inyong piniling mode of payment, itatanong pa din ang kabuuang halaga na inyong ibabayad bago ito maproseso.",
      },
    ],
  },
]

export const afterSalesQuestions = [
  {
    question:
      "Saan o kanino kami pwedeng magtanong o mag-report ng aming mga concerns?",
    answer: [
      {
        zero: " ",
        one: "Para sagutin ang inyong mga katanungan, tumawag lamang sa aming Hotline (#98000) o mag-chat sa aming official Facebook page (www.facebook.com/prycegasofficial). ",
      },
    ],
  },
  {
    question: "Paano ba maging isang PRYCEGAS LPG dealer?",
    answer: [
      {
        zero: " ",
        one: "Mag-chat lamang sa aming official Facebook page (www.facebook.com/prycegasofficial) at sabihin ang inyong intension na maging isang dealer. Ibigay lang din ang inyong complete name, exact address at contact details para matawagan kayo ng aming mga Area Officers. ",
      },
    ],
  },
  {
    question: "Gaano katagal bago maubos ang PRYCEGAS LPG?",
    answer: [
      {
        zero: " ",
        one: "Depende ito sa laki ng inyong biniling produkto at sa dalas ninyong gamitin ito.  Ang mas importante ay siguraduhin na walang tagas or naiiwang nakabukas ang inyong tangke para maiwasan ang aksaya o sakuna.",
      },
    ],
  },
  {
    question: "Paano mapapanatiling maayos ang kundisyon ng aming mga tangke?",
    answer: [
      {
        zero: " ",
        one: "Siguraduhin na ang inyong tangke ay palaging nakatayo, nasa patag na lugar, hindi nadudumihan, at hindi nababasa ng ulan o nabibilad sa araw.",
      },
    ],
  },
  {
    question: "Paano malalaman kung may singaw/tagas ang inyong mga tangke?",
    answer: [
      {
        zero: " ",
        one: "Bago gamitin ang inyong LPG cylinder, suriing mabuti ang regulator at hose nito sa pamamagitan ng paglalagay ng soap solution (tubig na may sabon). Basain ang basahan ng tubig na may sabon at ipahid sa valve ng tangke habang nakasara ang pihitan ng stove. Punasan din ng basang basahan ang regulator at hose (hanggang sa parte na nakakabit sa stove). Kapag patuloy ang pagbula ng ipinahid na soap solution, meron tagas ang parteng ito. ",
      },
    ],
  },
  {
    question:
      "Papalitan ba ang aking ginagamit na tangke kung magpapa-deliver ako ng refill?",
    answer: [
      {
        zero: " ",
        one: "Oo, makakasiguro kayo na ang mga ipapalit naming tangke ay nasa maganda at maayos na kundisyon katulad ng inyong ginagamit. ",
      },
    ],
  },
]

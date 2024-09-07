export const navLinks = [
  { id: "home", title: "Home", to: "/" },
  { id: "market", title: "Market", to: "market" },
  { id: "trade", title: "Trade", to: "trade" },
  { id: "cth-way", title: "CTH-Way", to: "cth-way" },
  { id: "about", title: "About Us", to: "about" },
];

export const presentUser = {
  id: "01",
  firstName: "David",
  lastName: "David",
  email: " ",
  emailIsVerified: false,
  totalBalance: 198300,
  assets: [
    { symbol: "btc", balance: 10000 },
    { symbol: "eth", balance: 3469 },
    { symbol: "usdt", balance: 12769 },
  ],
  orders: [
    {
      id: "001",
      type: "limit",
      side: "buy",
      date: "",
      pair: "BTC/USDT",
      amount: 12800,
      status: "open",
    },
    {
      id: "002",
      type: "stop-limit",
      side: "sell",
      date: "",
      pair: "ETH/USDT",
      amount: 7200,
      status: "close",
    },
    {
      id: "003",
      type: "stop-market",
      side: "buy",
      date: "",
      pair: "SOL/USDT",
      amount: 15206,
      status: "open",
    },
  ],
};

export const faqLinksOne = [
  {
    title: "What is Crypto?",
    description:
      "Cryptocurrency is a digital or virtual currency that operates on distributed ledger technology called a blockchain and uses cryptography for security. It is decentralized and operates independently of a central bank. Unlike traditional currencies, cryptocurrencies are not backed by a physical commodity or government, and their value is determined by market demand and supply. Cryptocurrencies can buy goods and services, transfer funds, and trade in markets. Popular cryptocurrencies include Bitcoin, Ethereum, Litecoin, Ripple, and Cronos. ",
  },
  {
    title: "What is a cryptocurrency exchange?",
    description:
      "Cryptocurrency exchanges are digital marketplaces that enable users to buy and sell cryptocurrencies like Bitcoin, Ethereum, and Tether. ",
  },
  {
    title: "What currencies does the CTH Exchange support?",
    description:
      "CTH supports all cryptocurrency coins. You can trade and swap different crypto",
  },
  {
    title: "Is CTH a safe cryptocurrency exchange?",
    description:
      "CTH is committed to providing a safe and trustworthy trading platform and boasts one of the most sophisticated security technologies and maintenance teams in the world, including a dedicated security team that constantly works to keep your assets and account secure alongside independently-verified Proof of Reserves that verifies all user assets are backed on a 1:1 basis.",
  },
  {
    title: "Do you have more Questions",
    description: "Contact our 24/7 customer support",
  },
];

import { Helmet } from "react-helmet";

const Meta = ({ title, description, keywords }) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={`${description}`} />
      <meta name="keywords" content={`${keywords}`} />
    </Helmet>
  );
};

Meta.defaultProps = {
  title: "Welcome to ProShop",
  description: "We sell cheap products",
  keywords: "eletronics, buy eletronics",
};

export default Meta;

import { Helmet } from "react-helmet-async";
interface PageTitleProps {
  title: string;
}
function PageTitle({ title }: PageTitleProps) {
  return (
    <Helmet>
      <title>{title} | Instaclone</title>
    </Helmet>
  );
}

export default PageTitle;

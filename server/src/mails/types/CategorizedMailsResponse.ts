import CategorizedMail from "./CategorizedMail";

type CategorizedMailsResponse={
    mails:CategorizedMail[];
    syncTime:Date;
}
export default CategorizedMailsResponse;
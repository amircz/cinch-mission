import CategorizedMail from "./CategorizedMail";

type CategorizedMailsResponse={
    mails:CategorizedMail[];
    syncTime:string;
}
export default CategorizedMailsResponse;
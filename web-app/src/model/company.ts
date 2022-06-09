import JobOffer from "./jobOffer";
import CustomComment from "./comment";

export default interface Company{
    id: string;
    name: string;
    address: string;
    email: string;
    phoneNumber: string;
    description: string;
    isVerified: boolean;
    comments: CustomComment[];
    jobOffers: JobOffer[];
}
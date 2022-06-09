import JobOffer from "./jobOffer";

export default interface Company{
    id: string;
    name: string;
    address: string;
    email: string;
    phoneNumber: string;
    description: string;
    isVerified: boolean;
    comments: Comment[];
    jobOffers: JobOffer[];
}
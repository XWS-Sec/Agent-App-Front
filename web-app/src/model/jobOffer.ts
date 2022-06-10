import CustomComment from "./comment";

export default interface JobOffer{
    id: string;
    description: string;
    jobTitle: string;
    prerequisites: string;
    isPublished: boolean;
    comments: CustomComment[]
}
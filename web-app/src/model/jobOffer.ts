export default interface JobOffer{
    id: string;
    description: string;
    jobTitle: string;
    prerequisites: string;
    isPublished: boolean;
    Comments: Comment[]
}
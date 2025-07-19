export interface Alluser {
    _id: string ;
    map(arg0: (person: string, index: number) => import("react/jsx-runtime").JSX.Element): import("react").ReactNode;
    username:string;
    category:string;
    email:string;
    mesage?:string;
    bioMessage:string;
    createdAt:number|string
}
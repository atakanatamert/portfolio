import { AuthRequiredError
} from "@/lib/exceptions";

const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const page = async ({}) => {
    await wait(5000);

    const response = await fetch("https://jsonplaceholder.typicode.com/posts/1");
    const data = await response.json();

    throw new AuthRequiredError();

    return <div>{JSON.stringify(data)
    }</div>;
};

export default page;

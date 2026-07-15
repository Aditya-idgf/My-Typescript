// import axios from "axios";
// axios.get('https://jsonplaceholder.typicode.com/todos/1')
// .then(response => {
//   console.log(response.data);
// })

// with Axios
// import axios from "axios";
// import type { AxiosResponse } from "axios";

// interface Todo {
//   userId: number,
//   id: number,
//   title: string,
//   completed: boolean
// }

// const fetchData = async () => {
//   try {
//     const response: AxiosResponse<Todo> = await axios.get('https://jsonplaceholder.typicode.com/todos/1')
//     console.log('TODO : ', response.data);
    
//   } catch (error : any) {
//     if(axios.isAxiosError(error)){
//       console.log("Axios Error: ", error.message);
//       if(error.response) {
//         console.log(error.response.status);
//       }
//     }
//   }
// } 

// with Fetch API
interface Todo {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

const fetchData = async (): Promise<void> => {
  try {
    const response = await fetch(
      "https://jsonplaceholder.typicode.com/todos/1"
    );

    if (!response.ok) {
      throw new Error(`HTTP Error: ${response.status}`);
    }

    const data = (await response.json()) as Todo;

    console.log(data);
    console.log("Title:", data.title);
    console.log("Completed:", data.completed);
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error(error.message);
    } else {
      console.error("An unknown error occurred.");
    }
  }
};

fetchData();


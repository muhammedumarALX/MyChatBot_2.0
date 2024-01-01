import axios from "axios"


export const loginUser = async (email: string, password: string) => {
    const res = await axios.post("/user/login", { email, password });
    if (res.status !== 201) {
        console.log(res.status)
      throw new Error("Unable to login");

    }
    const data = await res.data;
    console.log(data)
    return data;
  };
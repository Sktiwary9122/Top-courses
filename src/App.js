import React, { useEffect } from "react";
import Navbar from "./components/Navbar";
import Filter from "./components/Filter";
import Cards from "./components/Cards";
import { apiUrl, filterData } from "./data";
import { toast } from "react-toastify";
import { useState } from "react";
import Spinner from "./components/Spinner";
const App = () => {
  const [courses, setCourses] = useState(" ");
  const [loading, setLoading] = useState(true);
  const [category,setCategory] =useState(filterData[0].title);
  async function fetchData() {
    setLoading(true);
    try {
      const res = await fetch(apiUrl);
      const Output = await res.json();
      setCourses(Output.data);
    } catch (error) {
      toast.error("Something Went Wrong");
    }
    setLoading(false);
  }
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="min-h-[100vh]  flex flex-col bg-bgDark2">
      <div>
        <Navbar></Navbar>
      </div>

    <div className="">
      <div>
        <Filter filterData={filterData} category={category} setCategory={setCategory}></Filter>
      </div>

      <div className="w-11/12 max-w-[1200px] mx-auto flex flex-wrap justify-center min-h-[50vh]">
        {loading ? <Spinner></Spinner> : <Cards courses={courses} category={category}></Cards>}
      </div>
    </div>
    </div>
  );
};

export default App;

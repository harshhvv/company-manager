import React, { useState, useEffect } from 'react';
import './App.css';

type company = {
  name: string;
  department1: {
    departmentName: string;
    employees: {
      firstName: string;
      lastName: string;
    }[];
  }[];
}

const companyInfo: company = {
  name: "Biz4",
  department1: [{
    departmentName: "UI",
    employees: [{
      firstName: "",
      lastName: ""
    }]
  }
  ]
}

const JsonDisplay = (json: any, onAddDeveloper: any) => {
  const handleAddDeveloper = (department: string) => {
    onAddDeveloper(department);
  };

  const renderNode = (data: any, level: number) => {
    if (typeof data === 'object' && !Array.isArray(data)) {
      return (
        <ul>
          {Object.entries(data).map(([key, value]) => (
            <li key={key}>
              <span>{key}: </span>
              {renderNode(value, level + 1)}
            </li>
          ))}
          <br />
        </ul>
      );
    } else if (Array.isArray(data)) {
      return (
        <ul>
          {data.map((item, index) => (
            <li key={index}>
              {renderNode(item, level)}
              {/* <button onClick={() => handleAddDeveloper(level)}>+</button> */}
            </li>
          ))}
          <br />
        </ul>
      );
    } else {
      return <span>{data}</span>;
    }
  };

  return <div>{renderNode(json, 1)}</div>;
};

const App = () => {
  const [jsonData, setJsonData] = useState(companyInfo);
  const [departmentName, setDepartment] = useState('');
  const [fname, setFname] = useState('');
  const [lname, setLname] = useState('');
  const [newFname, setNewFname] = useState('');
  const [newLname, setNewLname] = useState('');

  const setDepartmentName = (department: string) => {
    setDepartment(department);
  };

  const setFirstName = (fname: string) => {
    setFname(fname);
  };

  const setLastName = (lname: string) => {
    setLname(lname);
  };


  const addDepartment = (department: any): void => {
    const newDepartment = {
      departmentName: departmentName,
      employees: [{
        firstName: fname,
        lastName: lname
      }]
    };
    const newJsonData = { ...jsonData };
    newJsonData.department1.push(newDepartment);
    setJsonData(newJsonData);
    setDepartmentName(" ");
    setFirstName(" ");
    setLastName(" ");
  };

  async function addToDatabase() {
    const dataToAdd: company = { ...jsonData };
    await fetch("http://localhost:5050/record", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      // body: JSON.stringify(dataToAdd)
      body: JSON.stringify(dataToAdd)

    })
      .catch(error => {
        window.alert(error);
        return;
      });
    console.log(dataToAdd.department1);
    // navigate("/");
  }

  const removeDepartment = (indx: number): void => {
    const newJsonData = { ...jsonData };
    newJsonData.department1.splice(indx, 1);
    setJsonData(newJsonData);
  };

  const removeEmployee = (indx: number, indx2: number): void => {
    const newJsonData = { ...jsonData };
    newJsonData.department1[indx].employees.splice(indx2, 1);
    setJsonData(newJsonData);
  };

  const addEmployee = (indx: number): void => {
    const newEmployee = {
      firstName: newFname,
      lastName: newLname
    };
    const newJsonData = { ...jsonData };
    newJsonData.department1[indx].employees.push(newEmployee);
    setJsonData(newJsonData);
  };

  useEffect(() => {
    // console.log(jsonData);
  }, [jsonData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newJsonData = { ...jsonData };
    newJsonData.name = (e.target as HTMLInputElement).value;
    setJsonData(newJsonData);
  }

  // console.log("zzzzzzz", jsonData)

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>, indx: number, indx2: number, val: string) => {
    // console.log(deptName);]
    const newJsonData = { ...jsonData };
    if (val === "departmentName") {
      newJsonData.department1[indx].departmentName = (e.target as HTMLInputElement).value;
    }

    else if (val === "firstName" || val === "lastName") {
      newJsonData.department1[indx].employees[indx2][val] = (e.target as HTMLInputElement).value;
    }
    setJsonData(newJsonData);

  }

  return (
    <div >
      <input value={jsonData.name} onChange={(e) => handleChange(e)} />
      <br />
      {jsonData.department1.map((department, i) => {
        // console.log(`hello this is index ${indx}`);
        return department.employees.map((employee, j) => {
          return (
            <>
              <div className='App'>
                {j === 0 && <input value={department.departmentName} type="text" placeholder='Department Name' onChange={(e) => handleInput(e, i, 0, "departmentName")} />}
                {j === 0 && <input value={employee.firstName} placeholder="First Name" onChange={(e) => handleInput(e, i, 0, "firstName")} />}
                {j === 0 && <input value={employee.lastName} placeholder="Last Name" onChange={(e) => handleInput(e, i, 0, "lastName")} />}
                {j !== 0 && <input value={department.employees[j].firstName} placeholder="new First Name" onChange={(e) => handleInput(e, i, j, "firstName")} />}
                {j !== 0 && <input value={department.employees[j].lastName} placeholder="new Last Name" onChange={(e) => handleInput(e, i, j, "lastName")} />}
                {j !== 0 && < button onClick={() => removeEmployee(i, j)}> - Remove Employee</button >}
                {j === 0 && < button onClick={() => addEmployee(i)}> + Add Employee</button >}
                {i === 0 && j === 0 && <button onClick={() => addToDatabase()}>Add to Database</button>}
                {i !== 0 && j === 0 && < button onClick={() => removeDepartment(i)}> - Remove Department</button >}
                <br />
              </div>
            </>
          )
        })
      })}
      <button onClick={(): void => addDepartment("")}>+ New Department</button>
      <br />
      <h1>JSON Display</h1>
      <JsonDisplay json={jsonData} addDepartment={addDepartment} />
      {/* <button onClick={(e) => addToDatabase(e)}>Add to Database</button> */}

    </div >
  );
};

export default App;







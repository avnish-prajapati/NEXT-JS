"use client";

import { useEffect, useMemo, useState } from "react";

import Navbar from "../../components/Navbar";
import DataTable from "../../components/DataTable";
import EditModal from "../../components/EditModal";

export default function DataPage() {
  const [users, setUsers] = useState([]);

  const [search, setSearch] = useState("");

  const [gender, setGender] = useState("All");

  const [education, setEducation] = useState("All");

  const [sortField, setSortField] = useState("id");

  const [sortOrder, setSortOrder] = useState("asc");

  const [currentPage, setCurrentPage] = useState(1);

  const [editingUser, setEditingUser] = useState(null);

  const rowsPerPage = 5;

  
useEffect(() => {
  const defaultUsers = [
    {
      id: 1,
      name: "Rahul Sharma",
      place: "Ahmedabad",
      gender: "Male",
      education: "BCA",
      number: "9876543210",
    },
    {
      id: 2,
      name: "Priya Patel",
      place: "Surat",
      gender: "Female",
      education: "MCA",
      number: "9876543211",
    },
    {
      id: 3,
      name: "Amit Kumar",
      place: "Vadodara",
      gender: "Male",
      education: "B.Tech",
      number: "9876543212",
    },
    {
      id: 4,
      name: "Neha Shah",
      place: "Rajkot",
      gender: "Female",
      education: "BBA",
      number: "9876543213",
    },
    {
      id: 5,
      name: "Vikas Patel",
      place: "Gandhinagar",
      gender: "Male",
      education: "MBA",
      number: "9876543214",
    },
  ];

  const savedData = localStorage.getItem("users");

  if (!savedData) {
    setUsers(defaultUsers);

    localStorage.setItem(
      "users",
      JSON.stringify(defaultUsers)
    );

    return;
  }

  const existingUsers = JSON.parse(savedData);

  // Agar existing data 5 se kam hai,
  // toh default data se missing records add karo
  if (existingUsers.length < 5) {
    const missingUsers = defaultUsers.slice(
      existingUsers.length
    );

    const updatedUsers = [
      ...existingUsers,
      ...missingUsers,
    ].map((user, index) => ({
      ...user,
      id: index + 1,
    }));

    setUsers(updatedUsers);

    localStorage.setItem(
      "users",
      JSON.stringify(updatedUsers)
    );
  } else {
    setUsers(existingUsers);
  }
}, []); 

const handleDelete = (id) => {
  const confirmDelete = window.confirm(
    "Are you sure you want to delete this data?"
  );

  if (!confirmDelete) {
    return;
  }


  const filteredUsers = users.filter(
    (user) => user.id !== id
  );

 
  const newUsers = filteredUsers.map((user, index) => ({
    ...user,
    id: index + 1,
  }));

  setUsers(newUsers);

  localStorage.setItem(
    "users",
    JSON.stringify(newUsers)
  );

  
  const newTotalPages = Math.ceil(
    newUsers.length / rowsPerPage
  );

  if (currentPage > newTotalPages && newTotalPages > 0) {
    setCurrentPage(newTotalPages);
  }
};


  const handleUpdate = (updatedUser) => {
    const newUsers = users.map((user) =>
      user.id === updatedUser.id
        ? updatedUser
        : user
    );

    setUsers(newUsers);

    localStorage.setItem(
      "users",
      JSON.stringify(newUsers)
    );

    setEditingUser(null);
  };

  

  const filteredUsers = useMemo(() => {
    let result = [...users];

    // Search
    if (search.trim() !== "") {
      const searchText = search.toLowerCase();

      result = result.filter((user) => {
        return (
          user.name
            .toLowerCase()
            .includes(searchText) ||
          user.place
            .toLowerCase()
            .includes(searchText) ||
          user.gender
            .toLowerCase()
            .includes(searchText) ||
          user.education
            .toLowerCase()
            .includes(searchText) ||
          user.number.includes(searchText)
        );
      });
    }

    // Gender filter
    if (gender !== "All") {
      result = result.filter(
        (user) => user.gender === gender
      );
    }

    // Education filter
    if (education !== "All") {
      result = result.filter(
        (user) => user.education === education
      );
    }

    return result;
  }, [users, search, gender, education]);


  const sortedUsers = useMemo(() => {
    const result = [...filteredUsers];

    result.sort((a, b) => {
      let valueA = a[sortField];
      let valueB = b[sortField];

      if (sortField === "id") {
        valueA = Number(valueA);
        valueB = Number(valueB);
      } else {
        valueA = String(valueA).toLowerCase();
        valueB = String(valueB).toLowerCase();
      }

      if (valueA < valueB) {
        return sortOrder === "asc" ? -1 : 1;
      }

      if (valueA > valueB) {
        return sortOrder === "asc" ? 1 : -1;
      }

      return 0;
    });

    return result;
  }, [filteredUsers, sortField, sortOrder]);



  const handleSort = (field) => {
    if (sortField === field) {
      setSortOrder(
        sortOrder === "asc" ? "desc" : "asc"
      );
    } else {
      setSortField(field);
      setSortOrder("asc");
    }
  };



  const totalPages = Math.ceil(
    sortedUsers.length / rowsPerPage
  );

  const startIndex =
    (currentPage - 1) * rowsPerPage;

  const endIndex =
    startIndex + rowsPerPage;

  const currentUsers = sortedUsers.slice(
    startIndex,
    endIndex
  );



  const changePage = (page) => {
    setCurrentPage(page);
  };



  const handleSearch = (value) => {
    setSearch(value);
    setCurrentPage(1);
  };

  const handleGender = (value) => {
    setGender(value);
    setCurrentPage(1);
  };

  const handleEducation = (value) => {
    setEducation(value);
    setCurrentPage(1);
  };

  // UI


  return (
    <>
      <Navbar />

      <main className="table-page">

        <div className="page-title">
          <h1>Data Table</h1>

          <p>
            Manage all your records here.
          </p>
        </div>

        {/* Search and Filters */}

        <div className="filters">

          <input
            type="text"
            placeholder="Search..."
            value={search}
            onChange={(e) =>
              handleSearch(e.target.value)
            }
          />

          <select
            value={gender}
            onChange={(e) =>
              handleGender(e.target.value)
            }
          >
            <option value="All">
              All Gender
            </option>

            <option value="Male">
              Male
            </option>

            <option value="Female">
              Female
            </option>
          </select>

          <select
            value={education}
            onChange={(e) =>
              handleEducation(e.target.value)
            }
          >
            <option value="All">
              All Education
            </option>

            <option value="BCA">
              BCA
            </option>

            <option value="MCA">
              MCA
            </option>

            <option value="B.Tech">
              B.Tech
            </option>

            <option value="BBA">
              BBA
            </option>

            <option value="MBA">
              MBA
            </option>
          </select>

        </div>

        <div className="record-count">
          Total Records: {sortedUsers.length}
        </div>

        {/* Data Table */}

        <DataTable
          users={currentUsers}
          onDelete={handleDelete}
          onEdit={setEditingUser}
          onSort={handleSort}
          sortField={sortField}
          sortOrder={sortOrder}
        />

        {/* Pagination */}

        {totalPages > 0 && (
          <div className="pagination">

            <button
              disabled={currentPage === 1}
              onClick={() =>
                changePage(currentPage - 1)
              }
            >
              Previous
            </button>

            {Array.from(
              { length: totalPages },
              (_, index) => index + 1
            ).map((page) => (
              <button
                key={page}
                className={
                  currentPage === page
                    ? "active-page"
                    : ""
                }
                onClick={() =>
                  changePage(page)
                }
              >
                {page}
              </button>
            ))}

            <button
              disabled={
                currentPage === totalPages
              }
              onClick={() =>
                changePage(currentPage + 1)
              }
            >
              Next
            </button>

          </div>
        )}

        {/* Showing Records */}

        {sortedUsers.length > 0 && (
          <p className="showing-text">
            Showing {startIndex + 1} -{" "}
            {Math.min(
              endIndex,
              sortedUsers.length
            )}{" "}
            of {sortedUsers.length}
          </p>
        )}

        {/* Edit Modal */}

        {editingUser && (
          <EditModal
            user={editingUser}
            onUpdate={handleUpdate}
            onClose={() =>
              setEditingUser(null)
            }
          />
        )}

      </main>
    </>
  );
}
"use client";

export default function DataTable({
  users,
  onDelete,
  onEdit,
  onSort,
  sortField,
  sortOrder,
}) 
{

  const getArrow = (field) => {

    if (sortField !== field) {
      return "↕";
    }

    return sortOrder === "asc"
      ? "↑"
      : "↓";
  };

  if (users.length === 0) {

    return (
      <div className="empty-table">
        <h3>No Data Found</h3>

        <p>
          Add some data or change your search/filter.
        </p>
      </div>
    );
  }

  return (
    <div className="table-container">

      <table>

        <thead>

          <tr>

            <th
              onClick={() => onSort("id")}
            >
              ID {getArrow("id")}
            </th>

            <th
              onClick={() => onSort("name")}
            >
              Name {getArrow("name")}
            </th>

            <th
              onClick={() => onSort("place")}
            >
              Place {getArrow("place")}
            </th>

            <th
              onClick={() => onSort("gender")}
            >
              Gender {getArrow("gender")}
            </th>

            <th
              onClick={() =>
                onSort("education")
              }
            >
              Education {getArrow("education")}
            </th>

            <th
              onClick={() => onSort("number")}
            >
              Number {getArrow("number")}
            </th>

            <th>
              Action
            </th>

          </tr>

        </thead>

        <tbody>

          {users.map((user) => (

            <tr key={user.id}>

              <td>{user.id}</td>

              <td>{user.name}</td>

              <td>{user.place}</td>

              <td>{user.gender}</td>

              <td>{user.education}</td>

              <td>{user.number}</td>

              <td className="action-buttons">

                <button
                  className="edit-button"
                  onClick={() =>
                    onEdit(user)
                  }
                >
                  Edit
                </button>

                <button
                  className="delete-button"
                  onClick={() =>
                    onDelete(user.id)
                  }
                >
                  Delete
                </button>

              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>
  );
}
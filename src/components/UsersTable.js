const UserTable = () => {

    return (
        <div className="card w-[100%] bg-base-100 shadow-xl">
            <div className="card-body">
                <h2 className="card-title">Users!</h2>
                <table className="table-auto">
                    <thead>
                        <tr>
                            <th>Email</th>
                            <th>Name</th>
                            <th>Lastname</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user, index) => (
                            <tr key={index}>
                                <td>{user.email}</td>
                                <td>{user.name}</td>
                                <td>{user.lastname}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default UserTable;

const UsersTable = ({ index, email, name, lastname }) => {
    return (
        <tr key={index}>
            <td>{email}</td>
            <td>{name}</td>
            <td>{lastname}</td>
        </tr>
    );
}

export default UsersTable;

const ProfilePage = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUserData = localStorage.getItem('authUser');
    if (storedUserData) {
      setUser(JSON.parse(storedUserData));
    }
  }, []);

  return (
    <>
      {user ? (
        <Profile {...user} />
      ) : (
        <p>Loading...</p>
      )}
    </>
  );
}

export default ProfilePage;

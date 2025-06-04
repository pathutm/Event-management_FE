const dummyEvents = [
  { title: 'Tech Fest', venue: 'Hall A', date: '2025-06-05' },
  { title: 'Startup Meet', venue: 'Online', date: '2025-06-10' }
];

const AdminDashboardPage = () => {
  return (
    <div style={styles.container}>
      <h2>Admin Dashboard</h2>
      <div style={styles.cardContainer}>
        {dummyEvents.map((event, index) => (
          <div key={index} style={styles.card}>
            <h3>{event.title}</h3>
            <p>{event.venue}</p>
            <p>{event.date}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

const styles = {
  container: { padding: '2rem' },
  cardContainer: { display: 'flex', gap: '1rem', flexWrap: 'wrap' },
  card: { border: '1px solid #ccc', padding: '1rem', borderRadius: '8px', width: '200px' }
};

export default AdminDashboardPage;

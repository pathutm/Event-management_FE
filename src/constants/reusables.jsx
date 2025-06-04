const EventCard = ({ event, index }) => {
  const avatar = avatars[index % avatars.length];

  return (
    <div style={{
      border: '1px solid #ccc',
      borderRadius: 8,
      padding: 16,
      marginBottom: 16,
      backgroundColor: '#fff',
      boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
    }}>
      <img
        src={event.imageBase64 ? `data:image/jpeg;base64,${event.imageBase64}` : defaultEventImage}
        alt={event.title}
        style={{ width: '100%', borderRadius: 8, objectFit: 'cover', height: 180 }}
      />
      <div style={{ display: 'flex', alignItems: 'center', marginTop: 8 }}>
        <img
          src={avatar}
          alt="avatar"
          style={{ width: 40, height: 40, borderRadius: '50%', marginRight: 12 }}
        />
        <div>
          <h3 style={{ margin: 0 }}>{event.title}</h3>
          <p style={{ margin: 0, color: '#555' }}>{event.location} | {event.time}</p>
        </div>
      </div>
      <Button style={{ marginTop: 12 }} onClick={() => alert(`Booking: ${event.title}`)}>
        Book Now
      </Button>
    </div>
  );
};

export default EventCard;
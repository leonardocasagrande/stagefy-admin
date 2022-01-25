import { Axios } from 'config/axiosFetcher';

interface ICreateEvent {
  image: File;
  name: string;
  date: Date;
  professionalId: string;
}

const createEvent = async ({
  image,
  name,
  date,
  professionalId,
}: ICreateEvent) => {
  const formData = new FormData();
  formData.append('image', image);
  formData.append('name', name);
  formData.append('date', date.toISOString());
  formData.append('professionalId', professionalId);
  await Axios.post('/events', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};

const deleteEvent = async (eventId: string) => {
  await Axios.delete(`/events/${eventId}`);
};

export { createEvent, deleteEvent };

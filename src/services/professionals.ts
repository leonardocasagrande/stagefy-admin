import { Axios } from 'config/axiosFetcher';

const acceptProfessional = async (id: string) => {
  await Axios.post(`/professionals/${id}/accept`);
};

const refuseProfessional = async (id: string) => {
  await Axios.post(`/professionals/${id}/refuse`);
};

export { acceptProfessional, refuseProfessional };

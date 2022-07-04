interface IResposeUserDTO {
  id: string;
  username: string;
  email: string;
  password?: string;
  created_at: Date;
  updated_at: Date;
}

export default IResposeUserDTO;

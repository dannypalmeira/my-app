import axios from 'axios';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { nome, indicacao } = req.body;

    try {
      const response = await axios.post('https://script.google.com/macros/s/AKfycbwmMFVDD21w_6iL2K6-LqmOsffLoT0DvLI3aozX2iNdfr1tOlEgTRjS9pQdZoa4V_bV/exec', 
        new URLSearchParams({
            'nome': nome,
            'indicacao': indicacao,
          })
          );
      
      if (response.status === 200) {
        res.status(200).json({ success: true });
      } else {
        throw new Error('Failed to submit form data to Google Sheets');
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

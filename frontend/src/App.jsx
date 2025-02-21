import React, { useState } from 'react';
import axios from 'axios';
import {
  Container,
  Box,
  Typography,
  TextField,
  Button,
  Paper,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  OutlinedInput,
  Chip
} from '@mui/material';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

function App() {
  const [jsonInput, setJsonInput] = useState('');
  const [error, setError] = useState('');
  const [apiResponse, setApiResponse] = useState(null);
  const [selectedOptions, setSelectedOptions] = useState([]);

  // Use your localhost backend URL here
  const backendUrl = "https://bajaj-bhfl-22bcs10891.onrender.com/bfhl/bajaj";

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setApiResponse(null);

    let payload;
    try {
      payload = JSON.parse(jsonInput);
    } catch (err) {
      setError("Invalid JSON input");
      return;
    }

    if (!payload.data || !Array.isArray(payload.data)) {
      setError("JSON must contain a 'data' field that is an array.");
      return;
    }

    try {
      const response = await axios.post(backendUrl, payload, {
        headers: { 'Content-Type': 'application/json' }
      });
      const data = response.data;
      setApiResponse(data);
      if (data.roll_number) {
        document.title = data.roll_number;
      }
    } catch (err) {
      setError("Error calling API: " + err.message);
    }
  };

  const handleDropdownChange = (e) => {
    const {
      target: { value },
    } = e;
    setSelectedOptions(typeof value === 'string' ? value.split(',') : value);
  };

  const renderResponse = () => {
    if (!apiResponse) return null;

    const displayData = {};
    if (selectedOptions.includes("Numbers")) {
      displayData.numbers = apiResponse.numbers;
    }
    if (selectedOptions.includes("Alphabets")) {
      displayData.alphabets = apiResponse.alphabets;
    }
    if (selectedOptions.includes("Highest Alphabet")) {
      displayData.highest_alphabet = apiResponse.highest_alphabet;
    }
    
    return (
      <Paper elevation={6} sx={{ padding: 3, marginTop: 3, backgroundColor: '#fafafa', borderRadius: '8px' }}>
        <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold', color: '#333' }}>
          Response:
        </Typography>
        <pre style={{ backgroundColor: '#f0f0f0', padding: '15px', borderRadius: '4px' }}>
          {JSON.stringify(displayData, null, 2)}
        </pre>
      </Paper>
    );
  };

  return (
    <Container maxWidth="sm" sx={{ marginTop: 6, backgroundColor: '#e0f7fa', padding: 4, borderRadius: '12px' }}>
      <Paper elevation={6} sx={{ padding: 4, backgroundColor: '#ffffff', borderRadius: '12px' }}>
        <Typography variant="h4" align="center" gutterBottom sx={{ fontFamily: 'Roboto', fontWeight: 'bold', color: '#00796b' }}>
          Frontend Application
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 2 }}>
          <TextField
            label="JSON Input"
            multiline
            rows={4}
            fullWidth
            variant="outlined"
            value={jsonInput}
            onChange={(e) => setJsonInput(e.target.value)}
            placeholder='e.g. { "data": ["A", "C", "z"] }'
            sx={{ marginBottom: 2, backgroundColor: '#fafafa', borderRadius: '4px' }}
          />
          {error && (
            <Typography color="error" sx={{ marginBottom: 2 }}>
              {error}
            </Typography>
          )}
          <Button variant="contained" color="primary" type="submit" fullWidth sx={{ padding: '10px', backgroundColor: '#00796b', '&:hover': { backgroundColor: '#004d40' } }}>
            Submit
          </Button>
        </Box>
        {apiResponse && (
          <>
            <FormControl fullWidth sx={{ marginTop: 3 }}>
              <InputLabel id="multiple-select-label" sx={{ color: '#00796b' }}>Select Options</InputLabel>
              <Select
                labelId="multiple-select-label"
                multiple
                value={selectedOptions}
                onChange={handleDropdownChange}
                input={<OutlinedInput label="Select Options" />}
                renderValue={(selected) => (
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                    {selected.map((value) => (
                      <Chip key={value} label={value} sx={{ backgroundColor: '#00796b', color: 'white' }} />
                    ))}
                  </Box>
                )}
                MenuProps={MenuProps}
              >
                <MenuItem value="Numbers">Numbers</MenuItem>
                <MenuItem value="Alphabets">Alphabets</MenuItem>
                <MenuItem value="Highest Alphabet">Highest Alphabet</MenuItem>
              </Select>
            </FormControl>
            {renderResponse()}
          </>
        )}
      </Paper>
    </Container>
  );
}

export default App;

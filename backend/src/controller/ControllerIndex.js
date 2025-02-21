
export const getOperationCode = (req, res) => {
    res.status(200).json({
        operation_code: 1
    });
};
  
export const processData = (req, res) => {
    try {
      const { data } = req.body;
      if (!data || !Array.isArray(data)) {
        return res.status(400).json({
            is_success: false, error: "Invalid input. 'data' must be an array."
        });
      }
      
      const numbers = [];
      const alphabets = [];
      
      data.forEach(item => {
        const str = String(item).trim();
        if (/^\d+$/.test(str)) {
          numbers.push(str);
        } 
        else if (/^[A-Za-z]$/.test(str)) {
          alphabets.push(str);
        }
      });
      
      let highest_alphabet = [];
      if (alphabets.length > 0) {
        let highest = alphabets[0];
        alphabets.forEach(letter => {
          if (letter.toUpperCase() > highest.toUpperCase()) {
            highest = letter;
          }
        });
        highest_alphabet.push(highest);
      }
      
      const response = {
        is_success: true,
        user_id: "Vibhanshu_Kumar_21112004",
        email: "22BCS10891@bfhl.com",
        roll_number: "BFHL10891",
        numbers: numbers,
        alphabets: alphabets,
        highest_alphabet: highest_alphabet
      };
      
      res.status(200).json(response);
    } catch (error) {
      res.status(500).json({ is_success: false, error: error.message });
    }
};
  
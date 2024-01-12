import React, { useState } from 'react';
import './App.css'; 
import { Input, Textarea, Button, Box, Flex, Text } from '@chakra-ui/react'

const MyComponent = () => {
  const [ isLoading, setIsLoading ] = useState(false)
  const [prompt, setPrompt] = useState('');
  const [apiResult, setApiResult] = useState('');

  const handleButtonClick = async () => {
    try {
      setIsLoading(true)
      const response = await fetch("https://api-inference.huggingface.co/models/kaleabstark/roberta_gen_v_1", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",  // Set appropriate content type
          "Authorization": `Bearer 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`  // Example header
        },
        body: JSON.stringify({
          inputs: prompt
        })
      })
      
      const data = await response.json();
      setApiResult(data[0]['generated_text']);
    } catch (error) {
      console.error('Error fetching data:', error);
    }finally{
      setIsLoading(false)
    }
  };

  return (
    <Box as={Flex} flexDirection={'column'} textAlign={'center'} p={'20px'} gap={'2rem'} w={600}>
      <Text fontSize='4xl'>Machine Translation</Text>
      <label>
        <Input
         placeholder='Enter English input' 
         type="text"
         value={prompt}
         onChange={(e) => setPrompt(e.target.value)}
         />
      </label>
      <Button disabled={isLoading} w={'50%'} mx={'auto'} bgColor={'blue'} color={'white'} onClick={handleButtonClick}>{isLoading ? 'Translating...':'Translate Text'}</Button>
      {apiResult && (
        <div>
          <Text fontSize='2xl'>Amharic </Text>
          <Textarea mt={2} value={apiResult}  />
        </div>
      )}
    </Box>
  );
};

export default MyComponent;

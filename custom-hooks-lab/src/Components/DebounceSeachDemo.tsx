import { useState, useEffect } from 'react';
import { useDebounce } from '../CustomHooks/useDebounce';

const DebounceSearchDemo = () => {
  const [searchTerm, setSearchTerm] = useState('');
  
  // Use the hook! This value only updates 500ms after the user stops typing.
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  // Simulate an API call whenever the debounced value changes
  useEffect(() => {
    if (debouncedSearchTerm) {
      console.log(`📡 API CALL: Searching for: "${debouncedSearchTerm}"`);
    }
  }, [debouncedSearchTerm]);

  return (
    <div style={{ padding: '20px', maxWidth: '400px', fontFamily: 'sans-serif' }}>
      <h2>Search Debounce Demo</h2>
      
      <input
        type="text"
        placeholder="Type to search..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{
          width: '100%',
          padding: '10px',
          borderRadius: '4px',
          border: '1px solid #ccc',
          fontSize: '16px'
        }}
      />

      <div style={{ marginTop: '20px', padding: '10px', backgroundColor: '#f9f9f9', borderRadius: '8px' }}>
        <p><strong>Immediate Value:</strong> {searchTerm || '(empty)'}</p>
        <p style={{ color: '#007bff' }}>
          <strong>Debounced Value:</strong> {debouncedSearchTerm || '(waiting...)'}
        </p>
      </div>

      <small style={{ color: '#888' }}>
        Check the console to see when the "API call" is actually triggered!
      </small>
    </div>
  );
};

export default DebounceSearchDemo;
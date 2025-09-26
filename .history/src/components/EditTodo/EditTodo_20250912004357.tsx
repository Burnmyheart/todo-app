import { useState } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  gap: 4px;
  align-items: center;
  flex: 1;
`;

const Input = styled.input`
  flex: 1;
  padding: 4px 6px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
  outline: none;

  &:focus {
    border-color: #3742fa;
  }
`;

const Button = styled.button<{ variant?: 'primary' | 'secondary' }>`
  padding: 4px 8px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 11px;
  transition: all 0.2s ease;
  
  background-color: ${({ variant }) => 
    variant === 'primary' ? '#3742fa' : '#f1f2f6'
  };
  
  color: ${({ variant }) => 
    variant === 'primary' ? 'white' : '#333'
  };

  &:hover {
    opacity: 0.8;
  }
`;

interface Props {
  text: string;
  save: (text: string) => void;
  cancel: () => void;
}

export const EditTodo = ({ text, save, cancel }: Props) => {
  const [value, setValue] = useState(text);

  const handleSave = () => {
    if (!value.trim()) return;
    save(value.trim());
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSave();
    } else if (e.key === 'Escape') {
      cancel();
    }
  };

  return (
    <Container>
      <Input
        type="text"
        value={value}
        onChange={e => setValue(e.target.value)}
        onKeyDown={handleKeyPress}
        placeholder="Редактировать задачу..."
        autoFocus
      />
      <Button 
        variant="primary"
        onClick={handleSave}
      >
        
      </Button>
      <Button 
        variant="secondary"
        onClick={cancel}
      >
        
      </Button>
    </Container>
  );
};

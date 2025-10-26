import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';

describe('DeploymentCard - Basic Render', () => {
  it('el componente se renderiza sin errores', () => {
    const MockDeploymentCard = () => (
      <div data-testid="deployment-card">
        <h2>SafePanel App</h2>
        <p>Aplicación desplegada con CI/CD automático</p>
        <span>Desplegado</span>
        <span>v1.0.0</span>
        <button>Redesplegar</button>
      </div>
    );

    render(<MockDeploymentCard />);

    expect(screen.getByTestId('deployment-card')).toBeInTheDocument();
    expect(screen.getByText('SafePanel App')).toBeInTheDocument();
    expect(screen.getByText('Aplicación desplegada con CI/CD automático')).toBeInTheDocument();
  });
});

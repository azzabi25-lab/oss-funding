import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import OSSFundingPrototype from '../OSSFunding';
import '@testing-library/jest-dom';

describe('OSS Funding Platform', () => {
  
  // ✅ Test 1: Rendu initial
  test('should render the dashboard on initial load', () => {
    render(<OSSFundingPrototype />);
    expect(screen.getByText('OSS Funding Intelligence Platform')).toBeInTheDocument();
    expect(screen.getByText('Opportunités actives')).toBeInTheDocument();
  });

  // ✅ Test 2: Navigation entre onglets
  test('should navigate between tabs when clicked', async () => {
    render(<OSSFundingPrototype />);
    const donorsTab = screen.getByRole('button', { name: /Bailleurs/i });
    
    fireEvent.click(donorsTab);
    await waitFor(() => {
      expect(screen.getByText('Green Climate Fund')).toBeInTheDocument();
    });
  });

  // ✅ Test 3: Filtre d'opportunités
  test('should filter opportunities by search query', async () => {
    const user = userEvent.setup();
    render(<OSSFundingPrototype />);
    
    const oppTab = screen.getByRole('button', { name: /Opportunités/i });
    fireEvent.click(oppTab);

    const searchInput = screen.getByPlaceholderText(/Filtrer les opportunités/i);
    await user.type(searchInput, 'Climat');

    await waitFor(() => {
      expect(screen.getByText(/GCF Readiness Afrique/i)).toBeInTheDocument();
    });
  });

  // ✅ Test 4: Affichage des KPIs
  test('should display correct KPI values on dashboard', () => {
    render(<OSSFundingPrototype />);
    expect(screen.getByText('30')).toBeInTheDocument(); // Opportunités actives
    expect(screen.getByText('12')).toBeInTheDocument(); // Prioritaires
    expect(screen.getByText('9')).toBeInTheDocument();  // Deadlines < 30 jours
  });

  // ✅ Test 5: Affichage des bailleurs
  test('should render all donors on Donors tab', () => {
    render(<OSSFundingPrototype />);
    const donorsTab = screen.getByRole('button', { name: /Bailleurs/i });
    fireEvent.click(donorsTab);

    expect(screen.getByText('Green Climate Fund')).toBeInTheDocument();
    expect(screen.getByText('Agence Française de Développement')).toBeInTheDocument();
    expect(screen.getByText('Banque Africaine de Développement')).toBeInTheDocument();
  });

  // ✅ Test 6: Pipeline visuel
  test('should display pipeline stages', () => {
    render(<OSSFundingPrototype />);
    const pipelineTab = screen.getByRole('button', { name: /Pipeline/i });
    fireEvent.click(pipelineTab);

    expect(screen.getByText('Identification')).toBeInTheDocument();
    expect(screen.getByText('Analyse')).toBeInTheDocument();
    expect(screen.getByText('Préparation')).toBeInTheDocument();
  });

  // ✅ Test 7: Centre d'alertes
  test('should display alerts on Alerts tab', () => {
    render(<OSSFundingPrototype />);
    const alertsTab = screen.getByRole('button', { name: /Alertes/i });
    fireEvent.click(alertsTab);

    expect(screen.getByText(/Nouvel appel GCF détecté/)).toBeInTheDocument();
    expect(screen.getByText(/Deadline AFD Biodiversité/)).toBeInTheDocument();
  });

  // ✅ Test 8: Bassin des idées
  test('should display ideas on Ideas tab', () => {
    render(<OSSFundingPrototype />);
    const ideasTab = screen.getByRole('button', { name: /Bassin des idées/i });
    fireEvent.click(ideasTab);

    expect(screen.getByText(/Recharge artificielle des nappes sahéliennes/)).toBeInTheDocument();
    expect(screen.getByText(/Observatoire régional de la sécheresse/)).toBeInTheDocument();
  });

  // ✅ Test 9: Score badges affichés
  test('should display score badges with correct format', () => {
    render(<OSSFundingPrototype />);
    const scoreElements = screen.getAllByText(/\/100/);
    expect(scoreElements.length).toBeGreaterThan(0);
  });

  // ✅ Test 10: Barre de recherche globale
  test('should have global search input in header', () => {
    render(<OSSFundingPrototype />);
    const searchInput = screen.getByPlaceholderText(/Rechercher une opportunité/i);
    expect(searchInput).toBeInTheDocument();
  });

  // ✅ Test 11: Bouton "Nouvelle idée"
  test('should have "Nouvelle idée" button in header', () => {
    render(<OSSFundingPrototype />);
    const newIdeaButton = screen.getByRole('button', { name: /Nouvelle idée/i });
    expect(newIdeaButton).toBeInTheDocument();
  });

  // ✅ Test 12: Logo et titre de la plateforme
  test('should display platform branding', () => {
    render(<OSSFundingPrototype />);
    expect(screen.getByText('OSS Funding')).toBeInTheDocument();
    expect(screen.getByText('Intelligence Platform')).toBeInTheDocument();
  });
});

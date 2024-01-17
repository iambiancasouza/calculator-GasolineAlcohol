import { FormEvent, useState } from 'react'
import './App.css'

import logoImg from './assets/logo.png'

interface InfoProps {
  title: string
  gasoline: string | number
  alcohol: string | number
}

function App() {
  const [gasoline, setGasoline] = useState(0)
  const [alcohol, setAlcohol] = useState(0)
  const [info, setInfo] = useState<InfoProps | null>(null)

  const handleCalculation = (event: FormEvent) => {
    event.preventDefault()

    const calc = alcohol / gasoline

    if (calc <= 0.7) {
      setInfo({
        title: 'Compensa usar álcool!',
        gasoline: formatCurrency(gasoline),
        alcohol: formatCurrency(alcohol)
      })
    } else {
      setInfo({
        title: 'Compensa usar Gasolina!',
        gasoline: formatCurrency(gasoline),
        alcohol: formatCurrency(alcohol)
      })
    }
  }

  const formatCurrency = (value: number) => {
    const formatValue = value.toLocaleString('pt-br', {
      style: 'currency',
      currency: 'BRL'
    })

    return formatValue
  }

  return (
    <div>
      <main className="container">
        <img src={logoImg} alt="logo da calculadora" />
        <h1>Qual melhor opção?</h1>
        <form className="form" onSubmit={handleCalculation}>
          <label>Álcool (preço por litro):</label>
          <input
            className="input"
            type="number"
            placeholder="4,90"
            min="1"
            step="0.01"
            required
            value={alcohol}
            onChange={e => setAlcohol(Number(e.target.value))}
          />
          <label>Gasolina (preço por litro):</label>
          <input
            className="input"
            type="number"
            placeholder="4,90"
            min="1"
            step="0.01"
            required
            value={gasoline}
            onChange={e => setGasoline(Number(e.target.value))}
          />
          <input className="button" type="submit" value="Calcular" />
        </form>
        {info && Object.keys(info).length > 0 && (
          <section className="result">
            <h2 className="result-title">{info.title}</h2>
            <span>Álcool {info.alcohol}</span>
            <span>Gasolina {info.gasoline}</span>
          </section>
        )}
      </main>
    </div>
  )
}

export default App

import { useState, useCallback, useEffect } from 'react'
import './index.css'

function App() {

  const [length, setLength] = useState(8)
  const [numberAllowed, setNumberAllowed] = useState(false)
  const [charAllowed, setCharAllowed] = useState(false)
  const [password, setPassword] = useState("")
  const [copied, setCopied] = useState(false)
  const [strength, setStrength] = useState("Weak")

  // Password Generator
  const passwordGenerator = useCallback(() => {
    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"

    if (numberAllowed) str += "0123456789"
    if (charAllowed) str += "!@#$%^&*():{}[]~"

    for (let i = 0; i < length; i++) {
      let char = Math.floor(Math.random() * str.length)
      pass += str.charAt(char)
    }

    setPassword(pass)

  }, [length, numberAllowed, charAllowed])

  // Generate password automatically
  useEffect(() => {
    passwordGenerator()
  }, [passwordGenerator])

  // Strength Checker
  useEffect(() => {
    if (length < 8) setStrength("Weak")
    else if (length >= 8 && (numberAllowed || charAllowed)) setStrength("Medium")
    if (length >= 12 && numberAllowed && charAllowed) setStrength("Strong")
  }, [length, numberAllowed, charAllowed])

  // Copy Function
  const copyPassword = () => {
    navigator.clipboard.writeText(password)
    setCopied(true)
    setTimeout(() => setCopied(false), 1500)
  }

  // Strength Color
  const strengthColor =
    strength === "Weak"
      ? "text-red-500"
      : strength === "Medium"
      ? "text-yellow-400"
      : "text-green-500"

  return (
    <div className='w-full max-w-md mx-auto shadow-lg rounded-xl px-6 py-6 my-10 bg-gray-900 text-white'>

      <h1 className='text-2xl font-bold text-orange-400 mb-4'>
        🔐 Password Generator
      </h1>

      {/* Password Display */}
      <div className='flex shadow rounded-lg overflow-hidden mb-3'>
        <input
          type="text"
          value={password}
          className='outline-none w-full py-2 px-3 text-white'
          readOnly
        />
        <button
          onClick={copyPassword}
          className='bg-blue-500 px-3 text-white'
        >
          Copy
        </button>
      </div>

      {/* Copy Message */}
      {copied && <p className='text-green-400 text-sm'>Copied!</p>}

      {/* Strength */}
      <p className={`mt-2 font-semibold ${strengthColor}`}>
        Strength: {strength}
      </p>

      {/* Controls */}
      <div className='flex flex-col gap-4 mt-4'>

        {/* Length */}
        <div>
          <label className='block mb-1'>
            Length: {length}
          </label>
          <input
            type="range"
            min={6}
            max={20}
            value={length}
            onChange={(e) => setLength(Number(e.target.value))}
            className='w-full'
          />
        </div>

        {/* Numbers */}
        <div>
          <input
            type="checkbox"
            checked={numberAllowed}
            onChange={() => setNumberAllowed(prev => !prev)}
          />
          <label className='ml-2'>Include Numbers</label>
        </div>

        {/* Symbols */}
        <div>
          <input
            type="checkbox"
            checked={charAllowed}
            onChange={() => setCharAllowed(prev => !prev)}
          />
          <label className='ml-2'>Include Symbols</label>
        </div>

      </div>

      {/* Regenerate Button */}
      <button
        onClick={passwordGenerator}
        className='w-full mt-5 bg-orange-500 py-2 rounded-lg font-semibold hover:bg-orange-600 transition'
      >
        Generate New Password
      </button>

    </div>
  )
}

export default App
import { BackwardIcon, ForwardIcon } from '@heroicons/react/24/outline'
import React, { useEffect, useState } from 'react'
import Journey from './TimeTable/Journey'
import { FrDate, generate, isSameDay, nextWeek, prevWeek } from '../../../Helpers/Calendar'
import { getHttp } from '../../../Api/httpget'
import axios from 'axios'
import { useContext } from 'react'
import { ClasseContext } from '../../../Contexts/MyContext'

function Timetable() {
  const [currentDay, setCurrenDay] = useState(new Date())
  const [weekDays, setWeekDays] = useState([])
  const [startDay, setStarDay] = useState(new Date())
  const [endDay, setEndDay] = useState(new Date())
  const [classeName, setClasseName] = useState('')

  const [isGenerated, setIsGenerated] = useState(false)

  const todayStyle = (a, b) => {
    if (isSameDay(a, b)) {
      console.log('mitovy ilay daty')
      return ('bg-sky-200 border border-sky-700 border-2')
    }
    else {
      return ('bg-white')
    }
  }

  const { id_classe } = useContext(ClasseContext)

  const { data: crens, error } = getHttp(`http://localhost:3001/api/creneau`)

  const getClasseName = async () => {
    if (id_classe) {
      const currentClasse = await axios.get(`http://localhost:3001/api/group/${id_classe}`)
      setClasseName(() => currentClasse.data.nom_classe)
    }
  }

  useEffect(() => {
    getClasseName(id_classe)
  }, [id_classe])

  useEffect(() => {
    setWeekDays(generate(currentDay))
  }, [currentDay])

  useEffect(() => {
    setStarDay(weekDays[0])
    setEndDay(weekDays[weekDays.length - 1])
    console.log(weekDays, "ilay weekdays")
  }, [weekDays])

  const handleGenerate = async (startDay, endDay) => {
    if (window.confirm(`
    Voulez-vous générer emploi du temps du 
    ${FrDate(weekDays[1])} au ${FrDate(weekDays[weekDays.length - 1])}
    `)) {
      console.log(startDay, endDay)
      const res = await axios.get(`http://localhost:3001/api/genOccupation?dateDebut=${startDay}&dateFin=${endDay}`)
      // window.location.reload(false);
      if (res.data) {
        console.log(res.data)
        setIsGenerated(() => !isGenerated)
      }
    }
  }

  const handlCheckTimetable = async (startDay, endDay) => {
    if (window.confirm(`
    voulez-vous marquer tous les séances du
    ${FrDate(weekDays[1])} au ${FrDate(weekDays[weekDays.length - 1])}
    comme terminées`)) {
      const res = await axios.get(`http://localhost:3001/api/checkTimetable?dateDebut=${startDay}&dateFin=${endDay}`)
      // window.location.reload(false);
      setIsGenerated(() => !isGenerated)
    }
  }
  const handleDeleteTimetable = async (startDay, endDay) => {
    if (window.confirm(`
    voulez-vous effacer l'emploi du temps du
    ${FrDate(weekDays[1])} au ${FrDate(weekDays[weekDays.length - 1])}
    `)) {
      const res = await axios.get(`http://localhost:3001/api/deleteTimetable?dateDebut=${startDay}&dateFin=${endDay}`)
      // window.location.reload(false);
      setIsGenerated(() => !isGenerated)
    }
  }


  return (
    <div className='the_whole_timetable_tab'>


      {/* en tete au dessus du veritable emploi du temps */}
      <div className='flex justify-evenly py-6 pr-4  bg-white mx-4 mt-4 rounded-xl'>
        {/* bouton generer */}
        <input
          type="button"
          //disable generate in the past
          disabled={currentDay && currentDay < new Date() && !isSameDay(currentDay,new Date())}
          className=' h-12 flex items-center justify-center  bg-green-100 rounded-full px-4 border-2 border-green-700
                        cursor-pointer hover:bg-green-200  '
          value="Générer"
          onClick={() => { handleGenerate(startDay, endDay) }}
        />

        {/* bouton actualiser */}
        <input
          type="button"
          className=' h-12 flex items-center justify-center  bg-yellow-100 rounded-full px-4 border-2 border-yellow-700
          cursor-pointer hover:bg-yellow-200  '
          value="Actualiser "
          onClick={() => setIsGenerated(() => !isGenerated)}
        />

        {/* navigation  */}
        <div className="dateNavigate flex justify-center items-center gap-16">
          <div
            className='ajouterEnregistrer flex justify-center w-14 h-12'
            onClick={() => { setCurrenDay(prevWeek(currentDay)) }}
          >
            <BackwardIcon className='w-5' />
          </div>

          <div className="flex items-center flex flex-col ">
            <div>Semaine du <span className='text-sky-700'>{weekDays[1] && FrDate(weekDays[1])}</span></div>

            <div
              className='font-bold cursor-pointer'
              onClick={() => setIsGenerated(() => !isGenerated)}
            >
              {classeName}
            </div>
          </div>

          <div
            className='ajouterEnregistrer flex justify-center  w-14 h-12'
            onClick={() => { setCurrenDay(nextWeek(currentDay)) }}
          >
            <ForwardIcon className='w-5' />
          </div>
        </div>

        {/* Marquer comme finie tous les emplois du temps  */}
        <input
          type="button"
          className=' h-12 flex items-center justify-center  bg-purple-100 rounded-full px-4 border-2 border-purple-700
                        cursor-pointer hover:bg-purple-200  '
          value="Marquer "
          onClick={() => { handlCheckTimetable(startDay, endDay) }}
        />

        {/* bouton delete timetable */}
        <input
          type="button"
          className=' h-12 flex items-center justify-center  bg-pink-100 rounded-full px-4 border-2 border-pink-700
                        cursor-pointer hover:bg-pink-200  '
          value="Effacer"
          onClick={() => { handleDeleteTimetable(startDay, endDay) }}
        />

      </div>

      <div className='grid grid-cols-7 w-full py-4 pr-8 pl-4'>
        <div className='slot     p-1 rounded-md bg-white text-center'>Créneaux</div>
        <div className={weekDays[1] && `${todayStyle(weekDays[1], new Date())} mx-4 p-1 rounded-md text-center`}>Lun {new Date(weekDays[1]).getDate()}</div>
        <div className={weekDays[2] && `${todayStyle(weekDays[2], new Date())} mx-4 p-1 rounded-md text-center`}>Mar {new Date(weekDays[2]).getDate()}</div>
        <div className={weekDays[3] && `${todayStyle(weekDays[3], new Date())} mx-4 p-1 rounded-md text-center`}>Mer {new Date(weekDays[3]).getDate()}</div>
        <div className={weekDays[4] && `${todayStyle(weekDays[4], new Date())} mx-4 p-1 rounded-md text-center`}>Jeu {new Date(weekDays[4]).getDate()}</div>
        <div className={weekDays[5] && `${todayStyle(weekDays[5], new Date())} mx-4 p-1 rounded-md text-center`}>Ven {new Date(weekDays[5]).getDate()}</div>
        <div className={weekDays[6] && `${todayStyle(weekDays[6], new Date())} mx-4 p-1 rounded-md text-center`}>Sam {new Date(weekDays[6]).getDate()}</div>
      </div>


      {/* the actual timetable */}
      <div className='flex justify-center bg-white mx-4 py-4 h-[calc(100vh-280px)] overflow-auto scrollbar rounded-xl'>
        <div className="stots mr">
          {error && <div>{error}</div>}
          {
            crens && crens.map((cren) => (
              <div key={cren.id_cren} className='slot flex items-center m-4 h-32'>
                <div className='flex items-center bg-slate-200 h-12 rounded-sm  px-2'>{cren.valeur_cren}</div>
              </div>
            ))
          }
        </div>

        <Journey jour="Lun" date={new Date(weekDays[1])}
          isGenerated={isGenerated}
        />
        <Journey jour="Mar" date={new Date(weekDays[2])}
          isGenerated={isGenerated}
        />
        <Journey jour="Mer" date={new Date(weekDays[3])}
          isGenerated={isGenerated}
        />
        <Journey jour="Jeu" date={new Date(weekDays[4])}
          isGenerated={isGenerated}
        />
        <Journey jour="Ven" date={new Date(weekDays[5])}
          isGenerated={isGenerated}
        />
        <Journey jour="Sam" date={new Date(weekDays[6])}
          isGenerated={isGenerated}
        />

      </div>
    </div>
  )
}

export default Timetable
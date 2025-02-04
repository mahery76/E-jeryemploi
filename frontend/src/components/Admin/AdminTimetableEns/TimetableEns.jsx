import { BackwardIcon, ForwardIcon } from '@heroicons/react/24/outline'
import React, { useEffect, useState } from 'react'
import JourneyEns from './TimeTableEns/JourneyEns'
import { FrDate, generate, isSameDay, nextWeek, prevWeek } from '../../../Helpers/Calendar'
import { getHttp } from '../../../Api/httpget'
import axios, { Axios } from 'axios'
import { useContext } from 'react'
import { MyContext } from '../../../Contexts/MyContext'

function TimetableEns() {
  const [currentDay, setCurrenDay] = useState(new Date())
  const [weekDays, setWeekDays] = useState([])
  const [startDay, setStarDay] = useState(new Date())
  const [endDay, setEndDay] = useState(new Date())
  const [ensName, setEnsName] = useState('')
  const todayStyle = (a,b) => {
    if(isSameDay(a,b)){
      console.log('mitovy ilay daty')
      return ('bg-sky-200 border border-sky-700 border-2')
    }
    else{
      return('bg-white')
    }
  }

  const { id_ens } = useContext(MyContext)
  const { data: crens, error } = getHttp(`http://localhost:3001/api/creneau`)
  const getEnsName = async () => {
    if (id_ens) {
      const currentEns = await axios.get(`http://localhost:3001/api/enseignant/${id_ens}`)
      setEnsName(() => currentEns.data.nom_ens)
    }
  }
  useEffect(() => {
    getEnsName(id_ens)
  }, [id_ens])
  useEffect(() => {
    setWeekDays(generate(currentDay))
  }, [currentDay])

  useEffect(() => {
    setStarDay(weekDays[0])
    setEndDay(weekDays[weekDays.length - 1])
  }, [weekDays])

  return (
    <div className='the_whole_timetable_tab'>

      {/* navigation  */}
      <div className="flex justify-center py-6 gap-12 bg-white mx-4 mt-4 rounded-xl">
        <div
          className='ajouterEnregistrer flex justify-center w-14 h-12'
          onClick={() => { setCurrenDay(prevWeek(currentDay)) }}
        >
          <BackwardIcon className='w-5' />
        </div>

        <div className="flex items-center flex flex-col ">
          <div>Semaine du <span className='text-sky-700'>{weekDays[1] && FrDate(weekDays[1])}</span></div>
          <div className=' font-bold'>{ensName}</div>
        </div>

        <div
          className='ajouterEnregistrer flex justify-center  w-14 h-12'
          onClick={() => { setCurrenDay(nextWeek(currentDay)) }}
        >
          <ForwardIcon className='w-5' />
        </div>
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
      <div className='flex justify-center  bg-white mx-4 py-4 h-[calc(100vh-280px)] overflow-auto scrollbar rounded-xl'>
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

        <JourneyEns jour="Lun" date={new Date(weekDays[1])} />
        <JourneyEns jour="Mar" date={new Date(weekDays[2])} />
        <JourneyEns jour="Mer" date={new Date(weekDays[3])} />
        <JourneyEns jour="Jeu" date={new Date(weekDays[4])} />
        <JourneyEns jour="Ven" date={new Date(weekDays[5])} />
        <JourneyEns jour="Sam" date={new Date(weekDays[6])} />
      </div>

    </div>
  )
}

export default TimetableEns
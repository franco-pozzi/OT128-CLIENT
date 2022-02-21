import React, { useEffect, useState } from 'react'

import { Box, Container } from '@mui/material'

import { alertServiceError } from '../../../services/AlertService/AlertService'

import { Spinner } from '../../../components/Spinner/Spinner'
import { Title } from '../../../components/Title/Title'
import parse from 'html-react-parser'

import { Controller, Scene } from 'react-scrollmagic'
import { Tween, Timeline } from 'react-gsap'

import { useNavigate, useParams } from 'react-router-dom'

import { getNews } from '../../../services/ApiServices/newsApiService'

export const NewsDetailPublic = () => {
  const newsId = useParams()

  let navigate = useNavigate()

  const [loader, setLoader] = useState(false)
  const [news, setNews] = useState(null)

  useEffect(
    () =>
      (async () => {
        setLoader(true)

        const requestNews = await getNews(newsId)
        if (requestNews.error) {
          alertServiceError(
            requestNews.message,
            'No se pudo obtener la información solicitada',
          )
          navigate('/')
        }

        const newsData = requestNews.data?.data
        newsData
          ? setNews(newsData)
          : alertServiceError(
              'No se pudo cargar la noticia',
              'Verificá que la URL sea correcta',
            ) && navigate('/')

        setLoader(false)
      })(),
    [newsId],
  )

  return (
    <>
      {loader ? (
        <Spinner />
      ) : (
        <Container sx={{ mt: 4 }}>
          <Controller>
            <Scene duration={600} triggerHook={0.5} offset={225}>
              <Box sx={{ flexDirection: 'column' }}>
                <Box
                  component="span"
                  sx={{ fontSize: 16, mt: 1, display: 'flex' }}
                >
                  <small>
                    <strong>
                      {news &&
                        new Date(news.updated_at).toLocaleDateString('es-AR')}
                    </strong>
                  </small>
                </Box>

                <Title image={news?.image}>{news?.name}</Title>

                <Box sx={{ my: 5 }}>{news && parse(news.content)}</Box>
              </Box>
            </Scene>
            <h2>Comentarios</h2>
            <Scene
              duration={500}
              triggerHook={0.75}
              pin={{ pushFollowers: true }}
              offset={125}
            >
              {(progress) => (
                <Box>
                  <Timeline totalProgress={progress} paused>
                    <Timeline
                      target={
                        <p>
                          {news && String(news.content) && 'No hay comentarios'}
                        </p>
                      }
                    >
                      <Tween from={{ opacity: -1 }} to={{ opacity: 1 }} />
                    </Timeline>
                  </Timeline>
                </Box>
              )}
            </Scene>
          </Controller>
        </Container>
      )}
    </>
  )
}
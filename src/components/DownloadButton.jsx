import React from 'react'
import TablaPDF from './TablaPDF'
import { PDFDownloadLink } from '@react-pdf/renderer'

function DownloadButton({folio, fecha, hora, fn}) {

  return (
          <PDFDownloadLink document= {<TablaPDF folio = {folio} fecha = {fecha} hora = {hora} />} fileName="tabla.pdf">
          {({ blob, url, loading, error }) =>
            loading ? 'Generando el archivo PDF...' : 'Descargar PDF Vertical'
          }
        </PDFDownloadLink>
  )
}

export default DownloadButton
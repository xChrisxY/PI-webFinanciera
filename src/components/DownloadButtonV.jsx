import React from 'react'
import TablaPDF from './TablaPDF'
import { PDFDownloadLink } from '@react-pdf/renderer'
import TablaPDFH from './TablaPDFH'

function DownloadButtonV({folio, fecha, hora, fn}) {

  return (
          <PDFDownloadLink document= {<TablaPDFH folio = {folio} fecha = {fecha} hora = {hora} />} fileName="tabla.pdf">
          {({ blob, url, loading, error }) =>
            loading ? 'Generando el archivo PDF...' : 'Descargar PDF Horizontal'
          }
        </PDFDownloadLink>
  )
}

export default DownloadButtonV
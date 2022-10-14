export interface Linestyle {
    labels: string[],
    datasets: [        
      {
        label: string,
        data: any,
        fill: boolean,
        borderColor: string,
        tension: number,
        backgroundColor: string,
        drawActiveElementsOnTop: any
      }
    ]
  }

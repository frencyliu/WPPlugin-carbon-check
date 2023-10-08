import React from 'react'
import { Card } from 'antd'
import { Link } from 'react-router-dom'
import defaultImage from '@/static/defaultImage.jpg'
import { renderHTML } from '@/utils'

const { Meta } = Card

const ProjectsCompanyCard: React.FC<{
  id: number
  title: string
  description: string
  image: any
}> = ({ id, title, description, image }) => (
  <Link to="check" state={{ id }}>
    <Card
      className="aspect-[3/4] w-full"
      cover={
        <img
          className="aspect-[16/9] object-cover"
          alt={title}
          src={image?.source_url || defaultImage}
        />
      }
    >
      <Meta title={title} description={renderHTML(description)} />
    </Card>
  </Link>
)

export default ProjectsCompanyCard

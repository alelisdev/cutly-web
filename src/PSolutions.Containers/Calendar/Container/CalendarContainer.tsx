import React from "react";
import FullCalendar from '@fullcalendar/react';
import listPlugin from '@fullcalendar/list';
import scrollGrid from '@fullcalendar/scrollgrid'
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import hrLocale from "@fullcalendar/core/locales/hr"
import interactionPlugin from '@fullcalendar/interaction';
import resourceTimeGrid from '@fullcalendar/resource-timegrid';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Card, Col, Dropdown, Row } from "react-bootstrap";
import { MainCard } from "../../../PSolutions.Layout/Card/MainCard";

export const CalendarContainer = React.memo(() => {
  return (
    <React.Fragment>
      <MainCard>
        <Card.Header>
          <Row className="align-items-center gx-0">
            <Col xs="auto" className="d-flex justify-content-end order-md-1">
              <Button variant="link" className="icon-item icon-item-sm icon-item-hover shadow-none p-0 me-1 ms-md-2"> <FontAwesomeIcon icon="arrow-left"/></Button>
              <Button variant="link" className="icon-item icon-item-sm icon-item-hover shadow-none p-0 me-lg-2"><FontAwesomeIcon icon="arrow-right"/></Button>
            </Col>
            <Col xs="auto" className="d-flex justify-content-center order-md-2">
              <h4 className="mb-0 fs-0 fs-sm-1 fs-lg-2">01. April, 2022</h4>
            </Col>
            <Col xs md="auto" className="d-flex justify-content-end order-md-3">
              <Button size="sm" variant="falcon-primary">Today</Button>
            </Col>
            <Col md="auto" className="d-md-none">
              <hr/>
            </Col>
            <Col xs="auto" className="d-flex order-md-0">
              <Button variant="primary" size="sm">
                <FontAwesomeIcon icon="plus" className="me-2"/>
                Novi termin
              </Button>
            </Col>
            <Col className="d-flex justify-content-end order-md-2">
              <Dropdown className="font-sans-serif me-2">
                <Dropdown.Toggle variant="falcon-default" className="text-600 dropdown-caret-none" size="sm">
                  <span className="me-2">Day view</span>
                  <FontAwesomeIcon icon="sort"/>
                </Dropdown.Toggle>
                <Dropdown.Menu className="border py-2">
                  <div className="d-flex justify-content-between cursor-pointer text-capitalize dropdown-item cursor-pointer active">Week view<FontAwesomeIcon icon="check" transform="down-4 shrink-4"/></div>
                  <div className="d-flex justify-content-between cursor-pointer text-capitalize dropdown-item cursor-pointer">Month view</div>
                  <div className="d-flex justify-content-between cursor-pointer text-capitalize dropdown-item cursor-pointer">List view</div>
                </Dropdown.Menu>
              </Dropdown>
            </Col>
          </Row>
        </Card.Header>
        <Card.Body className="p-0">
          <FullCalendar
            firstDay={1}
            height="100%"
            locale={hrLocale}
            editable={false}
            selectable={true}
            allDaySlot={true}
            slotMinWidth={10}
            slotMinTime="08:00"
            slotMaxTime="22:00"
            nowIndicator={true}
            selectMirror={true}
            businessHours={true}
            duration={{hours: 1}}
            headerToolbar={false}
            slotEventOverlap={false}
            initialView="timeGridWeek"
            resourceOrder="orderingNumber"
            slotLabelInterval={{hours: 1}}
            schedulerLicenseKey="CC-Attribution-NonCommercial-NoDerivatives"
            slotLabelFormat={{hour: 'numeric', minute: '2-digit', hour12: false}}
            eventTimeFormat={{hour: "2-digit", minute: "2-digit", hourCycle: "h24"}}
            plugins={[resourceTimeGrid, interactionPlugin, scrollGrid, dayGridPlugin, timeGridPlugin, scrollGrid, listPlugin]}
          />
        </Card.Body>
      </MainCard>
    </React.Fragment>
  );
});
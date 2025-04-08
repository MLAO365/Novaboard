"use client"

import { useState } from "react"
import { CalendarIcon, ChevronLeft, ChevronRight, Clock, Coins, Users, MapPin, Info } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import PageHeader from "@/components/page-header"
import GlitchText from "@/components/glitch-text"

// Sample events data
const eventsData = [
  {
    id: "event-001",
    title: "Quantum Tech Auction",
    description:
      "Exclusive auction featuring cutting-edge quantum technology prototypes from leading research facilities.",
    date: "2187-04-20",
    time: "19:00",
    location: "Luxury District - Auction House",
    type: "auction",
    organizer: "Commerce Guild",
    entryFee: 5000,
    rewards: "Rare tech prototypes, exclusive access to quantum research",
    status: "upcoming",
  },
  {
    id: "event-002",
    title: "Neural Interface Tournament",
    description:
      "Competitive gaming tournament using the latest neural interface technology. Test your skills in direct mind-to-machine combat.",
    date: "2187-04-25",
    time: "14:00",
    location: "Digital Network Hub - Arena Level",
    type: "tournament",
    organizer: "Digital Collective",
    entryFee: 1000,
    rewards: "100,000 credits, prototype neural enhancers",
    status: "upcoming",
  },
  {
    id: "event-003",
    title: "Black Market Clearance",
    description:
      "Special clearance sale of confiscated goods from recent Shadow Syndicate raids. All items sold as-is with no questions asked.",
    date: "2187-04-18",
    time: "22:00",
    location: "Undercity - Warehouse 7",
    type: "market",
    organizer: "Anonymous Broker",
    entryFee: 500,
    rewards: "Discounted contraband, rare items",
    status: "upcoming",
  },
  {
    id: "event-004",
    title: "Experimental Biotech Showcase",
    description:
      "Scientific demonstration of the latest advancements in biological augmentation technology. Volunteer test subjects needed.",
    date: "2187-04-30",
    time: "10:00",
    location: "Research Station Gamma - Exhibition Hall",
    type: "showcase",
    organizer: "Science Regulation Authority",
    entryFee: 0,
    rewards: "Free basic augmentations for volunteers, research data",
    status: "upcoming",
  },
  {
    id: "event-005",
    title: "Orbital Defense Simulation",
    description:
      "Military training exercise open to civilian participants. Test your combat skills in a simulated orbital defense scenario.",
    date: "2187-05-05",
    time: "08:00",
    location: "Military District - Training Facility",
    type: "training",
    organizer: "Nova Fleet Command",
    entryFee: 2000,
    rewards: "Military-grade equipment, security clearance upgrades",
    status: "upcoming",
  },
  {
    id: "event-006",
    title: "Resistance Recruitment Drive",
    description:
      "Seeking new members to join the fight against corporate oppression. Bring your own weapons and a distrust for authority.",
    date: "2187-05-10",
    time: "20:00",
    location: "Outer Rim Territories - Abandoned Factory",
    type: "recruitment",
    organizer: "Freedom Coalition",
    entryFee: 0,
    rewards: "Faction reputation, access to restricted areas",
    status: "upcoming",
  },
  {
    id: "event-007",
    title: "Annual Tech Expo",
    description:
      "The biggest technology exhibition of the year, featuring innovations from across Novaterra and beyond.",
    date: "2187-05-15",
    time: "09:00",
    location: "Central Hub - Convention Center",
    type: "expo",
    organizer: "Commerce Guild & Science Regulation Authority",
    entryFee: 1500,
    rewards: "Technology samples, networking opportunities",
    status: "upcoming",
  },
  {
    id: "event-008",
    title: "Synthetic Drug Trial",
    description:
      "Clinical trial for a new cognitive enhancement drug. Participants will be compensated for their time and potential side effects.",
    date: "2187-04-15",
    time: "13:00",
    location: "Medical District - Research Clinic",
    type: "trial",
    organizer: "Unknown Pharmaceutical Company",
    entryFee: 0,
    rewards: "10,000 credits, free medication for life (if successful)",
    status: "completed",
  },
  {
    id: "event-009",
    title: "Virtual Reality Escape Challenge",
    description:
      "Test your problem-solving skills in a deadly VR simulation. Failure in the game means pain in real life.",
    date: "2187-04-10",
    time: "16:00",
    location: "Entertainment District - VR Center",
    type: "challenge",
    organizer: "Digital Collective",
    entryFee: 3000,
    rewards: "50,000 credits, exclusive neural software",
    status: "completed",
  },
  {
    id: "event-010",
    title: "Corporate Espionage Contract",
    description: "High-paying job opportunity for skilled infiltrators. Target details provided upon acceptance.",
    date: "2187-04-05",
    time: "23:00",
    location: "Luxury District - Rooftop Bar",
    type: "contract",
    organizer: "Anonymous Client",
    entryFee: 0,
    rewards: "200,000 credits, rare technology",
    status: "completed",
  },
]

// Helper function to group events by month
const groupEventsByMonth = (events: typeof eventsData) => {
  const grouped: Record<string, typeof eventsData> = {}

  events.forEach((event) => {
    const [year, month] = event.date.split("-")
    const key = `${year}-${month}`

    if (!grouped[key]) {
      grouped[key] = []
    }

    grouped[key].push(event)
  })

  return grouped
}

export default function EventsPage() {
  const [activeTab, setActiveTab] = useState("upcoming")
  const [currentMonth, setCurrentMonth] = useState("2187-04") // Format: YYYY-MM

  // Filter events based on active tab
  const filteredEvents = eventsData.filter((event) => event.status === activeTab)

  // Group events by month
  const eventsByMonth = groupEventsByMonth(filteredEvents)

  // Get events for the current month
  const currentMonthEvents = eventsByMonth[currentMonth] || []

  // Format month for display
  const formatMonth = (monthStr: string) => {
    const [year, month] = monthStr.split("-")
    const date = new Date(Number.parseInt(year), Number.parseInt(month) - 1)
    return date.toLocaleDateString("en-US", { month: "long", year: "numeric" })
  }

  // Navigate to previous/next month
  const navigateMonth = (direction: "prev" | "next") => {
    const [year, month] = currentMonth.split("-").map(Number)

    let newYear = year
    let newMonth = month

    if (direction === "prev") {
      newMonth -= 1
      if (newMonth < 1) {
        newMonth = 12
        newYear -= 1
      }
    } else {
      newMonth += 1
      if (newMonth > 12) {
        newMonth = 1
        newYear += 1
      }
    }

    setCurrentMonth(`${newYear}-${newMonth.toString().padStart(2, "0")}`)
  }

  // Get badge color based on event type
  const getEventTypeBadge = (type: string) => {
    switch (type) {
      case "auction":
        return <Badge className="bg-purple-900/50 text-purple-400 border-purple-500/50">AUCTION</Badge>
      case "tournament":
        return <Badge className="bg-red-900/50 text-red-400 border-red-500/50">TOURNAMENT</Badge>
      case "market":
        return <Badge className="bg-green-900/50 text-green-400 border-green-500/50">MARKET</Badge>
      case "showcase":
        return <Badge className="bg-blue-900/50 text-blue-400 border-blue-500/50">SHOWCASE</Badge>
      case "training":
        return <Badge className="bg-orange-900/50 text-orange-400 border-orange-500/50">TRAINING</Badge>
      case "recruitment":
        return <Badge className="bg-yellow-900/50 text-yellow-400 border-yellow-500/50">RECRUITMENT</Badge>
      case "expo":
        return <Badge className="bg-cyan-900/50 text-cyan-400 border-cyan-500/50">EXPO</Badge>
      case "trial":
        return <Badge className="bg-emerald-900/50 text-emerald-400 border-emerald-500/50">TRIAL</Badge>
      case "challenge":
        return <Badge className="bg-indigo-900/50 text-indigo-400 border-indigo-500/50">CHALLENGE</Badge>
      case "contract":
        return <Badge className="bg-rose-900/50 text-rose-400 border-rose-500/50">CONTRACT</Badge>
      default:
        return <Badge className="bg-slate-900/50 text-slate-400 border-slate-500/50">EVENT</Badge>
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <PageHeader
        title="EVENT CALENDAR"
        subtitle="Upcoming and past developer events"
        icon={<CalendarIcon className="h-6 w-6 text-pink-500" />}
        accentColor="pink"
      />

      <div className="mt-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="bg-black/50 border border-pink-900/50 w-full sm:w-auto">
            <TabsTrigger
              value="upcoming"
              className="data-[state=active]:bg-pink-900/30 data-[state=active]:text-pink-400"
            >
              Upcoming Events
            </TabsTrigger>
            <TabsTrigger
              value="completed"
              className="data-[state=active]:bg-pink-900/30 data-[state=active]:text-pink-400"
            >
              Past Events
            </TabsTrigger>
          </TabsList>

          <TabsContent value={activeTab} className="mt-6">
            <Card className="bg-black/50 border-pink-900/50">
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-pink-500 font-vt323 flex items-center text-base">
                    <CalendarIcon className="h-5 w-5 mr-2 text-pink-500" />
                    EVENTS CALENDAR
                  </CardTitle>
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-8 w-8 border-pink-900/50 text-pink-500 hover:bg-pink-900/20"
                      onClick={() => navigateMonth("prev")}
                    >
                      <ChevronLeft className="h-4 w-4" />
                    </Button>
                    <div className="text-sm font-vt323 text-pink-400">{formatMonth(currentMonth)}</div>
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-8 w-8 border-pink-900/50 text-pink-500 hover:bg-pink-900/20"
                      onClick={() => navigateMonth("next")}
                    >
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-4">
                {currentMonthEvents.length > 0 ? (
                  <div className="space-y-4">
                    {currentMonthEvents.map((event) => (
                      <Card
                        key={event.id}
                        className="bg-black/70 border-pink-900/30 hover:border-pink-500/30 transition-colors"
                      >
                        <CardContent className="p-4">
                          <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                            <div className="flex-1">
                              <div className="flex items-center justify-between mb-2">
                                <GlitchText>
                                  <h3 className="text-lg font-vt323 text-pink-400">{event.title}</h3>
                                </GlitchText>
                                {getEventTypeBadge(event.type)}
                              </div>
                              <p className="text-sm text-slate-400 mb-3">{event.description}</p>

                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs mb-3">
                                <div className="flex items-center">
                                  <CalendarIcon className="h-3 w-3 text-pink-500 mr-2" />
                                  <span className="text-slate-500 mr-1">DATE:</span>
                                  <span className="text-slate-300">{event.date}</span>
                                </div>
                                <div className="flex items-center">
                                  <Clock className="h-3 w-3 text-pink-500 mr-2" />
                                  <span className="text-slate-500 mr-1">TIME:</span>
                                  <span className="text-slate-300">{event.time}</span>
                                </div>
                                <div className="flex items-center">
                                  <MapPin className="h-3 w-3 text-pink-500 mr-2" />
                                  <span className="text-slate-500 mr-1">LOCATION:</span>
                                  <span className="text-slate-300">{event.location}</span>
                                </div>
                                <div className="flex items-center">
                                  <Users className="h-3 w-3 text-pink-500 mr-2" />
                                  <span className="text-slate-500 mr-1">ORGANIZER:</span>
                                  <span className="text-slate-300">{event.organizer}</span>
                                </div>
                              </div>

                              <div className="flex flex-wrap gap-3 text-xs">
                                <div className="flex items-center bg-black/50 border border-pink-900/30 rounded-md px-2 py-1">
                                  <Coins className="h-3 w-3 text-pink-500 mr-2" />
                                  <span className="text-slate-500 mr-1">ENTRY FEE:</span>
                                  <span className="text-slate-300">
                                    {event.entryFee > 0 ? `${event.entryFee} credits` : "Free"}
                                  </span>
                                </div>
                                <div className="flex items-center bg-black/50 border border-pink-900/30 rounded-md px-2 py-1">
                                  <Info className="h-3 w-3 text-pink-500 mr-2" />
                                  <span className="text-slate-500 mr-1">REWARDS:</span>
                                  <span className="text-slate-300 truncate max-w-[200px]" title={event.rewards}>
                                    {event.rewards}
                                  </span>
                                </div>
                              </div>
                            </div>

                            <div className="flex flex-col items-center justify-center min-w-[100px] bg-black/40 rounded-md p-3 border border-pink-900/30">
                              <div className="text-2xl font-vt323 text-pink-400">{event.date.split("-")[2]}</div>
                              <div className="text-xs text-slate-400">
                                {new Date(event.date).toLocaleDateString("en-US", { month: "short" })}
                              </div>
                              <Button
                                variant="outline"
                                size="sm"
                                className="mt-2 h-7 text-xs border-pink-900/50 text-pink-400 hover:bg-pink-900/20"
                              >
                                Register
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <div className="text-center p-8 border border-pink-900/30 rounded-md bg-black/30">
                    <CalendarIcon className="h-12 w-12 text-pink-500/30 mx-auto mb-4" />
                    <h3 className="text-lg font-vt323 text-pink-400 mb-2">No Events Found</h3>
                    <p className="text-slate-400 max-w-md mx-auto">
                      There are no {activeTab} events scheduled for {formatMonth(currentMonth)}.
                    </p>
                    <Button
                      variant="outline"
                      className="mt-4 border-pink-900/50 text-pink-400 hover:bg-pink-900/20"
                      onClick={() => setCurrentMonth("2187-04")}
                    >
                      Return to Current Month
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}


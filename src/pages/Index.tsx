import { useState } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import Icon from '@/components/ui/icon'

const Index = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedLogType, setSelectedLogType] = useState('all')

  const mockLogs = [
    {
      id: 1,
      type: 'admin',
      player: 'Admin_Kostya',
      action: 'Забанил игрока PlayerX за читы',
      timestamp: '2024-08-20 15:30:25',
      severity: 'high'
    },
    {
      id: 2,
      type: 'player',
      player: 'John_Smith',
      action: 'Подключился к серверу',
      timestamp: '2024-08-20 15:28:10',
      severity: 'info'
    },
    {
      id: 3,
      type: 'admin',
      player: 'Admin_Maks',
      action: 'Выдал предупреждение игроку NoobPlayer',
      timestamp: '2024-08-20 15:25:45',
      severity: 'medium'
    },
    {
      id: 4,
      type: 'system',
      player: 'System',
      action: 'Перезапуск сервера завершен',
      timestamp: '2024-08-20 15:20:00',
      severity: 'info'
    },
    {
      id: 5,
      type: 'player',
      player: 'Mike_Johnson',
      action: 'Покинул сервер',
      timestamp: '2024-08-20 15:15:30',
      severity: 'low'
    }
  ]

  const stats = {
    totalPlayers: 247,
    onlinePlayers: 89,
    adminActions: 156,
    serverUptime: '48h 23m'
  }

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high': return 'bg-red-500'
      case 'medium': return 'bg-yellow-500'
      case 'info': return 'bg-blue-500'
      default: return 'bg-gray-500'
    }
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'admin': return 'Shield'
      case 'player': return 'User'
      case 'system': return 'Settings'
      default: return 'Info'
    }
  }

  const filteredLogs = mockLogs.filter(log => {
    const matchesSearch = log.player.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         log.action.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesType = selectedLogType === 'all' || log.type === selectedLogType
    return matchesSearch && matchesType
  })

  return (
    <div className="min-h-screen bg-gta-gray">
      {/* Header */}
      <header className="bg-gta-blue shadow-lg">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                <Icon name="Gamepad2" className="text-white" size={24} />
              </div>
              <h1 className="text-2xl font-bold text-white">GTA 5 LOGS</h1>
            </div>
            <nav className="flex space-x-6">
              <Button variant="ghost" className="text-white hover:text-primary">
                <Icon name="Home" className="mr-2" size={16} />
                Главная
              </Button>
              <Button variant="ghost" className="text-white hover:text-primary">
                <Icon name="FileText" className="mr-2" size={16} />
                Логи
              </Button>
              <Button variant="ghost" className="text-white hover:text-primary">
                <Icon name="Users" className="mr-2" size={16} />
                Игроки
              </Button>
              <Button variant="ghost" className="text-white hover:text-primary">
                <Icon name="BarChart3" className="mr-2" size={16} />
                Статистика
              </Button>
            </nav>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-8 space-y-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="p-6 bg-white border-l-4 border-l-primary animate-fade-in">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gta-blue">Всего игроков</p>
                <p className="text-3xl font-bold text-gta-dark">{stats.totalPlayers}</p>
              </div>
              <Icon name="Users" className="text-primary" size={32} />
            </div>
          </Card>
          
          <Card className="p-6 bg-white border-l-4 border-l-green-500 animate-fade-in">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gta-blue">Онлайн</p>
                <p className="text-3xl font-bold text-gta-dark">{stats.onlinePlayers}</p>
              </div>
              <Icon name="UserCheck" className="text-green-500" size={32} />
            </div>
          </Card>
          
          <Card className="p-6 bg-white border-l-4 border-l-blue-500 animate-fade-in">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gta-blue">Действий админов</p>
                <p className="text-3xl font-bold text-gta-dark">{stats.adminActions}</p>
              </div>
              <Icon name="Shield" className="text-blue-500" size={32} />
            </div>
          </Card>
          
          <Card className="p-6 bg-white border-l-4 border-l-purple-500 animate-fade-in">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gta-blue">Аптайм сервера</p>
                <p className="text-3xl font-bold text-gta-dark">{stats.serverUptime}</p>
              </div>
              <Icon name="Clock" className="text-purple-500" size={32} />
            </div>
          </Card>
        </div>

        {/* Search and Filters */}
        <Card className="p-6 bg-white animate-scale-in">
          <div className="flex flex-col md:flex-row gap-4 items-center">
            <div className="flex-1">
              <div className="relative">
                <Icon name="Search" className="absolute left-3 top-3 text-gray-400" size={16} />
                <Input
                  placeholder="Поиск по игрокам и действиям..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="flex gap-2">
              <Button
                variant={selectedLogType === 'all' ? 'default' : 'outline'}
                onClick={() => setSelectedLogType('all')}
                size="sm"
              >
                Все
              </Button>
              <Button
                variant={selectedLogType === 'admin' ? 'default' : 'outline'}
                onClick={() => setSelectedLogType('admin')}
                size="sm"
              >
                <Icon name="Shield" className="mr-2" size={14} />
                Админы
              </Button>
              <Button
                variant={selectedLogType === 'player' ? 'default' : 'outline'}
                onClick={() => setSelectedLogType('player')}
                size="sm"
              >
                <Icon name="User" className="mr-2" size={14} />
                Игроки
              </Button>
              <Button
                variant={selectedLogType === 'system' ? 'default' : 'outline'}
                onClick={() => setSelectedLogType('system')}
                size="sm"
              >
                <Icon name="Settings" className="mr-2" size={14} />
                Система
              </Button>
            </div>
          </div>
        </Card>

        {/* Logs Section */}
        <Tabs defaultValue="logs" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="logs">Логи активности</TabsTrigger>
            <TabsTrigger value="admin">Администрация</TabsTrigger>
            <TabsTrigger value="players">Игроки</TabsTrigger>
          </TabsList>
          
          <TabsContent value="logs" className="space-y-4">
            {filteredLogs.map((log) => (
              <Card key={log.id} className="p-4 bg-white hover:shadow-md transition-all duration-200 animate-fade-in">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="flex-shrink-0">
                      <div className={`w-3 h-3 rounded-full ${getSeverityColor(log.severity)}`}></div>
                    </div>
                    <Icon name={getTypeIcon(log.type)} className="text-gta-blue" size={20} />
                    <div>
                      <div className="flex items-center space-x-2">
                        <span className="font-semibold text-gta-dark">{log.player}</span>
                        <Badge variant="secondary" className="text-xs">
                          {log.type}
                        </Badge>
                      </div>
                      <p className="text-gray-600 mt-1">{log.action}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-500">{log.timestamp}</p>
                    <Button variant="outline" size="sm" className="mt-2">
                      <Icon name="Eye" className="mr-2" size={14} />
                      Детали
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </TabsContent>
          
          <TabsContent value="admin" className="space-y-4">
            <Card className="p-6 bg-white">
              <h3 className="text-xl font-bold text-gta-dark mb-4">Активность администрации</h3>
              <div className="space-y-4">
                {mockLogs.filter(log => log.type === 'admin').map((log) => (
                  <div key={log.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-3">
                      <Icon name="Shield" className="text-primary" size={20} />
                      <div>
                        <p className="font-semibold text-gta-dark">{log.player}</p>
                        <p className="text-gray-600">{log.action}</p>
                      </div>
                    </div>
                    <span className="text-sm text-gray-500">{log.timestamp}</span>
                  </div>
                ))}
              </div>
            </Card>
          </TabsContent>
          
          <TabsContent value="players" className="space-y-4">
            <Card className="p-6 bg-white">
              <h3 className="text-xl font-bold text-gta-dark mb-4">Активность игроков</h3>
              <div className="space-y-4">
                {mockLogs.filter(log => log.type === 'player').map((log) => (
                  <div key={log.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-3">
                      <Icon name="User" className="text-blue-500" size={20} />
                      <div>
                        <p className="font-semibold text-gta-dark">{log.player}</p>
                        <p className="text-gray-600">{log.action}</p>
                      </div>
                    </div>
                    <span className="text-sm text-gray-500">{log.timestamp}</span>
                  </div>
                ))}
              </div>
            </Card>
          </TabsContent>
        </Tabs>

        {/* API Info */}
        <Card className="p-6 bg-white border-l-4 border-l-primary">
          <h3 className="text-xl font-bold text-gta-dark mb-4 flex items-center">
            <Icon name="Code" className="mr-2" size={24} />
            REST API Интеграция
          </h3>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="p-4 bg-gray-50 rounded-lg">
              <h4 className="font-semibold text-gta-blue mb-2">GET /api/logs</h4>
              <p className="text-gray-600 text-sm">Получить все логи с фильтрацией</p>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg">
              <h4 className="font-semibold text-gta-blue mb-2">POST /api/logs</h4>
              <p className="text-gray-600 text-sm">Добавить новую запись в логи</p>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg">
              <h4 className="font-semibold text-gta-blue mb-2">GET /api/stats</h4>
              <p className="text-gray-600 text-sm">Получить статистику сервера</p>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg">
              <h4 className="font-semibold text-gta-blue mb-2">GET /api/players</h4>
              <p className="text-gray-600 text-sm">Список активных игроков</p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}

export default Index
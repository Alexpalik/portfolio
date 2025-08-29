'use client'
import { useEffect, useRef } from 'react'
import * as THREE from 'three'

export default function ThreeModel() {
  const mountRef = useRef<HTMLDivElement>(null)
  const frameId = useRef<number | undefined>(undefined)

  useEffect(() => {
    if (!mountRef.current) return

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(75, 600 / 600, 0.1, 1000)
    const renderer = new THREE.WebGLRenderer({ 
      alpha: true, 
      antialias: true,
      powerPreference: "high-performance",
      precision: "highp"
    })
    
    // Instead of fixed 600x600, make it responsive
    const isMobile = window.innerWidth < 768
    const size = isMobile ? 500 : 600
    renderer.setSize(size, size)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    mountRef.current.appendChild(renderer.domElement)

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.2)
    scene.add(ambientLight)

    const keyLight = new THREE.DirectionalLight(0xffffff, 1.5)
    keyLight.position.set(5, 5, 5)
    scene.add(keyLight)

    const fillLight = new THREE.DirectionalLight(0x4a90e2, 0.8)
    fillLight.position.set(-5, 0, 3)
    scene.add(fillLight)

    let alexanderModel: THREE.Object3D | null = null

    const loadModel = async () => {
      try {
        const { GLTFLoader } = await import('three/examples/jsm/loaders/GLTFLoader.js')
        const loader = new GLTFLoader()

        loader.load(
          '/models/alexander_the_great.glb',
          (gltf) => {
            alexanderModel = gltf.scene
            
            // Get model bounding box
            const box = new THREE.Box3().setFromObject(alexanderModel)
            const size = box.getSize(new THREE.Vector3())
            const center = box.getCenter(new THREE.Vector3())
            
            console.log('Original model center:', center)
            console.log('Original model size:', size)
            
            // Center the model at origin
            alexanderModel.position.set(
              -center.x,  // Center horizontally
              -center.y,  // Center vertically  
              -center.z   // Center depth
            )
            
            // Scale it appropriately
            const maxDimension = Math.max(size.x, size.y, size.z)
            const scale = 6 / maxDimension // Adjust this if too big/small
            alexanderModel.scale.set(scale, scale, scale)
            
            // Final positioning - should be centered now
            // No additional position adjustments needed since we centered it above
            
            scene.add(alexanderModel)
            console.log('Alexander centered and scaled')
            console.log('Final position:', alexanderModel.position)
            console.log('Scale factor:', scale)
          },
          (progress) => {
            console.log('Loading:', Math.round((progress.loaded / progress.total) * 100) + '%')
          },
          (error) => {
            console.error('Error:', error)
          }
        )
      } catch (error) {
        console.error('GLTFLoader error:', error)
      }
    }

    loadModel()

    // Position camera to look at center
    camera.position.set(0, 0, 10)
    camera.lookAt(0, 0, 0)

    const animate = () => {
      frameId.current = requestAnimationFrame(animate)
      
      if (alexanderModel) {
        alexanderModel.rotation.y += 0.005
      }
      
      renderer.render(scene, camera)
    }
    
    animate()

    return () => {
      if (frameId.current) {
        cancelAnimationFrame(frameId.current)
      }
      if (mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement)
      }
      renderer.dispose()
    }
  }, [])

  return (
    <div className="flex items-center justify-center !overflow-x-hidden">
      <div 
        ref={mountRef} 
        className="!overflow-hidden"
        style={{width: '100%', height: '100%'}}
      />
    </div>
  )
}